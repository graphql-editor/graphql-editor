export function runAfterFramePaint(callback: () => void) {
  requestAnimationFrame(() => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = callback;
    messageChannel.port2.postMessage(undefined);
  });
}
