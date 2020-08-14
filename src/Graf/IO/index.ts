// import { EventBus } from "@eventBus";
// export * from "./ScreenPosition";
// /**
//  * IO:
//  *
//  * Service that handles user input. Responsibilities:
//  * - attach mouse and keyboard listeners
//  * - broadcast IO events by putting them on the bus
//  */
// export class IO {
//   private lastClick = Date.now();
//   private touchStartTime = Date.now();
//   private elementRect?: ClientRect;
//   private hasContainerFocus = false;
//   constructor(private element: HTMLDivElement) {
//     this.calculateClientBoundingRect();
//     element.addEventListener("mouseleave", (e) => {
//       e.preventDefault();
//       this.eventBus.publish("ScreenMouseLeave");
//     });
//     element.addEventListener("mousemove", (event) => {
//       event.preventDefault();
//       if (!this.elementRect || !this.hasContainerFocus) {
//         return;
//       }
//       const e = { position: this.createMouseEventPayload(event) };
//       this.eventBus.publish("ScreenMouseMove", e);
//       if (event.buttons === 1) {
//         this.eventBus.publish("ScreenMouseDrag", e);
//       } else {
//         this.eventBus.publish("ScreenMouseOverMove", e);
//       }
//     });
//     // ...
//     element.addEventListener("wheel", (e) => {
//       e.preventDefault();
//       const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;

//       const coords = this.createMouseEventPayload(e);

//       this.eventBus.publish("ScreenMouseWheel", {
//         delta,
//         position: coords,
//       });
//     });
//     element.addEventListener("mouseup", (event) => {
//       event.preventDefault();
//       if (event.which === 1) {
//         this.eventBus.publish("ScreenLeftMouseUp", {
//           position: this.createMouseEventPayload(event),
//         });
//       } else if (event.which === 3) {
//         this.eventBus.publish("ScreenRightMouseUp", {
//           position: this.createMouseEventPayload(event),
//         });
//       }
//     });
//     element.addEventListener("mousedown", (event) => {
//       this.hasContainerFocus = true;
//       if (event.which === 1) {
//         this.eventBus.publish("ScreenLeftMouseClick", {
//           position: this.createMouseEventPayload(event, event.shiftKey),
//         });
//         const clickTime = Date.now();
//         const diff = clickTime - this.lastClick;
//         if (diff < 250) {
//           this.eventBus.publish("ScreenDoubleClick", {
//             position: this.createMouseEventPayload(event),
//           });
//         }
//         this.lastClick = clickTime;
//       } else if (event.which === 3) {
//         this.eventBus.publish("ScreenRightMouseClick", {
//           position: this.createMouseEventPayload(event),
//         });
//       }
//     });
//     element.addEventListener("keydown", (event) => {
//       const ctrl = event.ctrlKey || event.metaKey;
//       if (event.key === "m") {
//         this.eventBus.publish("MPressed");
//       }
//       if (event.key === "Delete") {
//         this.eventBus.publish("DeletePressed");
//       }
//       if (event.key === "Backspace") {
//         this.eventBus.publish("BackspacePressed");
//       }
//       if (event.key === "z" && ctrl && !event.shiftKey) {
//         this.eventBus.publish("UndoRequested");
//       }
//       if (event.key === "z" && ctrl && event.shiftKey) {
//         this.eventBus.publish("RedoRequested");
//       }
//     });
//     element.addEventListener("touchstart", (event) => {
//       event.preventDefault();
//       this.eventBus.publish("ScreenLeftMouseClick", {
//         position: this.createTouchEventPayload(event),
//       });
//       this.touchStartTime = Date.now();
//     });
//     element.addEventListener("touchend", (event) => {
//       event.preventDefault();
//       const touchEndTime = Date.now();
//       const diff = touchEndTime - this.touchStartTime;
//       if (diff > 500) {
//         this.eventBus.publish("ScreenRightMouseUp", {
//           position: this.createTouchEventPayload(event),
//         });
//       }
//       this.touchStartTime = touchEndTime;
//     });
//   }

//   calculateClientBoundingRect() {
//     this.elementRect = this.element.getBoundingClientRect();
//   }

//   getReferenceRect() {
//     return (
//       this.elementRect || {
//         left: 0,
//         top: 0,
//       }
//     );
//   }

//   createMouseEventPayload(position: MouseEvent, shiftKey = false) {
//     const referenceRect = this.getReferenceRect();

//     return {
//       x: position.clientX  - referenceRect.left ,
//       y: position.clientY - referenceRect.top ,
//       shiftKey,
//     };
//   }

//   createTouchEventPayload(position: TouchEvent, shiftKey = false) {
//     const referenceRect = this.getReferenceRect();

//     return {
//       x: position.changedTouches[0].clientX * 2 - referenceRect.left * 2,
//       y: position.changedTouches[0].clientY * 2 - referenceRect.top * 2,
//       shiftKey,
//     };
//   }
// }
