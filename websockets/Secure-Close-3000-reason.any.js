// META: script=websocket.sub.js

var testOpen = async_test("Create Secure WebSocket - Close the Connection - close(3000, reason) - Connection should be opened");
var testClose = async_test("Create Secure WebSocket - Close the Connection - close(3000, reason) - readyState should be in CLOSED state and wasClean is TRUE - Connection should be closed");

var wsocket = CreateWebSocket(true, false, false);
var isOpenCalled = false;

wsocket.addEventListener('open', testOpen.step_func(function(evt) {
  wsocket.close(3000, "Clean Close with code - 3000");
  isOpenCalled = true;
  testOpen.done();
}), true);

wsocket.addEventListener('close', testClose.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_equals(wsocket.readyState, 3, "readyState should be 3(CLOSED)");
  assert_equals(evt.wasClean, true, "wasClean should be TRUE");
  testClose.done();
}), true);
