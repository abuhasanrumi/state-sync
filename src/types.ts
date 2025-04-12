export interface SyncHandler {
  send: (data: any) => void;
  close: () => void;
}