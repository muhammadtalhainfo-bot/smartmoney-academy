-- Enforce trade journal invariants at the database boundary.
-- Client-side validation remains for UX; this trigger protects direct Supabase writes too.
create or replace function public.validate_trade_row()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  calc_rr numeric;
  risk_num numeric;
begin
  if new.direction not in ('Long', 'Short') then
    raise exception 'Invalid trade direction';
  end if;

  if new.result not in ('Win', 'Loss', 'Break Even', 'Partial') then
    raise exception 'Invalid trade result';
  end if;

  if new.session is not null and length(new.session) > 32 then
    raise exception 'Trade session is too long';
  end if;

  if new.pair is null or length(new.pair) > 16 then
    raise exception 'Invalid trade symbol';
  end if;

  begin
    risk_num := new.risk_pct::numeric;
  exception when others then
    raise exception 'Invalid risk percentage';
  end;

  if risk_num <= 0 or risk_num > 100 or risk_num::text = 'NaN' then
    raise exception 'Risk percentage must be between 0 and 100';
  end if;

  if new.entry is not null and new.entry <= 0 then
    raise exception 'Entry must be greater than 0';
  end if;
  if new.sl is not null and new.sl <= 0 then
    raise exception 'Stop loss must be greater than 0';
  end if;
  if new.tp is not null and new.tp <= 0 then
    raise exception 'Take profit must be greater than 0';
  end if;
  if new.exit is not null and new.exit <= 0 then
    raise exception 'Exit price must be greater than 0';
  end if;
  if new.rr is not null and new.rr <= 0 then
    raise exception 'R:R must be greater than 0';
  end if;

  if new.entry is not null and new.sl is not null and new.tp is not null then
    if new.entry = new.sl then
      raise exception 'Entry and stop loss cannot be equal';
    end if;

    if new.direction = 'Long' then
      if new.sl >= new.entry or new.tp <= new.entry then
        raise exception 'Long trade prices have invalid direction';
      end if;
    else
      if new.sl <= new.entry or new.tp >= new.entry then
        raise exception 'Short trade prices have invalid direction';
      end if;
    end if;

    calc_rr := round(abs(new.tp - new.entry) / abs(new.entry - new.sl), 4);
    new.rr := calc_rr;
  end if;

  if new.screenshot_url is not null then
    if length(new.screenshot_url) > 2048 then
      raise exception 'Screenshot URL is too long';
    end if;
    if new.screenshot_url <> '' and new.screenshot_url !~* '^https?://' then
      raise exception 'Screenshot URL must use http or https';
    end if;
  end if;

  if new.notes_pre is not null and length(new.notes_pre) > 5000 then
    raise exception 'Pre-trade notes are too long';
  end if;
  if new.notes_post is not null and length(new.notes_post) > 5000 then
    raise exception 'Post-trade notes are too long';
  end if;
  if new.emotion_pre is not null and length(new.emotion_pre) > 100 then
    raise exception 'Pre-trade emotion is too long';
  end if;
  if new.emotion_post is not null and length(new.emotion_post) > 100 then
    raise exception 'Post-trade emotion is too long';
  end if;

  if new.setup is null or jsonb_typeof(new.setup) <> 'array' then
    raise exception 'Setup data must be an array';
  end if;
  if new.market is null or jsonb_typeof(new.market) <> 'array' then
    raise exception 'Market data must be an array';
  end if;
  if new.emotion_during is null or jsonb_typeof(new.emotion_during) <> 'array' then
    raise exception 'Emotion data must be an array';
  end if;
  if new.rules_checked is null or jsonb_typeof(new.rules_checked) <> 'array' then
    raise exception 'Rule checklist data must be an array';
  end if;

  if jsonb_array_length(new.setup) > 20
     or jsonb_array_length(new.market) > 20
     or jsonb_array_length(new.emotion_during) > 20
     or jsonb_array_length(new.rules_checked) > 20
     or coalesce(array_length(new.mistakes, 1), 0) > 20 then
    raise exception 'Trade tag arrays exceed the allowed size';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_trade_row_before_write on public.trades;

create trigger validate_trade_row_before_write
before insert or update on public.trades
for each row
execute function public.validate_trade_row();
