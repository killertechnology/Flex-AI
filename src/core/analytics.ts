type EventName =
  | 'page_view'
  | 'view_item_list'
  | 'select_item'
  | 'view_item'
  | 'search'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'begin_checkout'
  | 'contact_form_submit';

export const analytics = {
  track(event: EventName, payload: Record<string, unknown> = {}) {
    if (import.meta.env.DEV) {
      console.info(`[analytics:${event}]`, payload);
    }
  }
};
