/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.CameraControls = factory());
}(this, (function () { 'use strict';

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	// based on https://github.com/mrdoob/eventdispatcher.js/
	var EventDispatcher =
	/*#__PURE__*/
	function () {
	  function EventDispatcher() {
	    _classCallCheck(this, EventDispatcher);

	    this._listeners = {};
	  }

	  _createClass(EventDispatcher, [{
	    key: "addEventListener",
	    value: function addEventListener(type, listener) {
	      var listeners = this._listeners;

	      if (listeners[type] === undefined) {
	        listeners[type] = [];
	      }

	      if (listeners[type].indexOf(listener) === -1) {
	        listeners[type].push(listener);
	      }
	    }
	  }, {
	    key: "hasEventListener",
	    value: function hasEventListener(type, listener) {
	      var listeners = this._listeners;
	      return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
	    }
	  }, {
	    key: "removeEventListener",
	    value: function removeEventListener(type, listener) {
	      var listeners = this._listeners;
	      var listenerArray = listeners[type];

	      if (listenerArray !== undefined) {
	        var index = listenerArray.indexOf(listener);

	        if (index !== -1) {
	          listenerArray.splice(index, 1);
	        }
	      }
	    }
	  }, {
	    key: "dispatchEvent",
	    value: function dispatchEvent(event) {
	      var listeners = this._listeners;
	      var listenerArray = listeners[event.type];

	      if (listenerArray !== undefined) {
	        event.target = this;
	        var array = listenerArray.slice(0);

	        for (var i = 0, l = array.length; i < l; i++) {
	          array[i].call(this, event);
	        }
	      }
	    }
	  }]);

	  return EventDispatcher;
	}();

	var THREE;

	var _AXIS_Y;

	var _v2;

	var _v3A;

	var _v3B;

	var _v3C;

	var _v4;

	var _xColumn;

	var _yColumn;

	var _sphericalA;

	var _sphericalB;

	var isMac = /Mac/.test(navigator.platform);
	var EPSILON = 1e-5;
	var PI_2 = Math.PI * 2;
	var ACTION = Object.freeze({
	  NONE: 0,
	  ROTATE: 1,
	  TRUCK: 2,
	  DOLLY: 3,
	  ZOOM: 4,
	  TOUCH_ROTATE: 5,
	  TOUCH_TRUCK: 6,
	  TOUCH_DOLLY: 7,
	  TOUCH_ZOOM: 8,
	  TOUCH_DOLLY_TRUCK: 9,
	  TOUCH_ZOOM_TRUCK: 10
	});

	var CameraControls =
	/*#__PURE__*/
	function (_EventDispatcher) {
	  _inherits(CameraControls, _EventDispatcher);

	  _createClass(CameraControls, null, [{
	    key: "install",
	    value: function install(libs) {
	      THREE = libs.THREE;
	      _AXIS_Y = new THREE.Vector3(0, 1, 0);
	      _v2 = new THREE.Vector2();
	      _v3A = new THREE.Vector3();
	      _v3B = new THREE.Vector3();
	      _v3C = new THREE.Vector3();
	      _v4 = new THREE.Vector4();
	      _xColumn = new THREE.Vector3();
	      _yColumn = new THREE.Vector3();
	      _sphericalA = new THREE.Spherical();
	      _sphericalB = new THREE.Spherical();
	    }
	  }, {
	    key: "ACTION",
	    get: function get() {
	      return ACTION;
	    }
	  }]);

	  function CameraControls(camera, domElement) {
	    var _this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, CameraControls);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(CameraControls).call(this));
	    _this._camera = camera;
	    _this._yAxisUpSpace = new THREE.Quaternion().setFromUnitVectors(_this._camera.up, _AXIS_Y);
	    _this._yAxisUpSpaceInverse = _this._yAxisUpSpace.clone().inverse();
	    _this._state = ACTION.NONE;
	    _this.enabled = true;

	    if (_this._camera.isPerspectiveCamera) {
	      // How far you can dolly in and out ( PerspectiveCamera only )
	      _this.minDistance = 0;
	      _this.maxDistance = Infinity; // this.minFov = 1;
	      // this.maxFov = 180;
	    }

	    _this.minPolarAngle = 0; // radians

	    _this.maxPolarAngle = Math.PI; // radians

	    _this.minAzimuthAngle = -Infinity; // radians

	    _this.maxAzimuthAngle = Infinity; // radians

	    _this.minZoom = 0.01;
	    _this.maxZoom = Infinity; // Target cannot move outside of this box

	    _this._boundary = new THREE.Box3(new THREE.Vector3(-Infinity, -Infinity, -Infinity), new THREE.Vector3(Infinity, Infinity, Infinity));
	    _this.boundaryFriction = 0.0;
	    _this._boundaryEnclosesCamera = false;
	    _this.dampingFactor = 0.05;
	    _this.draggingDampingFactor = 0.25;
	    _this.azimuthRotateSpeed = 1.0;
	    _this.polarRotateSpeed = 1.0;
	    _this.dollySpeed = 1.0;
	    _this.truckSpeed = 2.0;
	    _this.dollyToCursor = false;
	    _this.verticalDragToForward = false;
	    _this._domElement = domElement;
	    _this._viewport = null; // the location of focus, where the object orbits around

	    _this._target = new THREE.Vector3();
	    _this._targetEnd = _this._target.clone(); // rotation

	    _this._spherical = new THREE.Spherical().setFromVector3(_this._camera.position.clone().applyQuaternion(_this._yAxisUpSpace));
	    _this._sphericalEnd = _this._spherical.clone();
	    _this._zoom = _this._camera.zoom;
	    _this._zoomEnd = _this._zoom;
	    _this.mouseButtons = {
	      left: ACTION.ROTATE,
	      middle: ACTION.DOLLY,
	      right: ACTION.TRUCK,
	      wheel: _this._camera.isPerspectiveCamera ? ACTION.DOLLY : _this._camera.isOrthographicCamera ? ACTION.ZOOM : ACTION.NONE // We can also add shiftLeft, altLeft and etc if someone wants...

	    };
	    _this.touches = {
	      one: ACTION.TOUCH_ROTATE,
	      two: _this._camera.isPerspectiveCamera ? ACTION.TOUCH_DOLLY_TRUCK : _this._camera.isOrthographicCamera ? ACTION.TOUCH_ZOOM_TRUCK : ACTION.TOUCH_NONE,
	      three: ACTION.TOUCH_TRUCK
	    }; // reset

	    _this._target0 = _this._target.clone();
	    _this._position0 = _this._camera.position.clone();
	    _this._zoom0 = _this._zoom;
	    _this._dollyControlAmount = 0;
	    _this._dollyControlCoord = new THREE.Vector2();
	    _this._hasUpdated = true;

	    _this.update(0);

	    if (!_this._domElement || options.ignoreDOMEventListeners) {
	      _this._removeAllEventListeners = function () {};
	    } else {
	      var onMouseDown = function onMouseDown(event) {
	        if (!scope.enabled) return;
	        event.preventDefault();
	        var prevState = scope._state;

	        switch (event.button) {
	          case THREE.MOUSE.LEFT:
	            scope._state = scope.mouseButtons.left;
	            break;

	          case THREE.MOUSE.MIDDLE:
	            scope._state = scope.mouseButtons.middle;
	            break;

	          case THREE.MOUSE.RIGHT:
	            scope._state = scope.mouseButtons.right;
	            break;
	        }

	        if (prevState !== scope._state) {
	          startDragging(event);
	        }
	      };

	      var onTouchStart = function onTouchStart(event) {
	        if (!scope.enabled) return;
	        event.preventDefault();
	        var prevState = scope._state;

	        switch (event.touches.length) {
	          case 1:
	            scope._state = scope.touches.one;
	            break;

	          case 2:
	            scope._state = scope.touches.two;
	            break;

	          case 3:
	            scope._state = scope.touches.three;
	            break;
	        }

	        if (prevState !== scope._state) {
	          startDragging(event);
	        }
	      };

	      var onMouseWheel = function onMouseWheel(event) {
	        if (!scope.enabled) return;
	        event.preventDefault(); // Ref: https://github.com/cedricpinson/osgjs/blob/00e5a7e9d9206c06fdde0436e1d62ab7cb5ce853/sources/osgViewer/input/source/InputSourceMouse.js#L89-L103

	        var mouseDeltaFactor = 120;
	        var deltaYFactor = isMac ? -1 : -3;
	        var delta = event.wheelDelta !== undefined ? event.wheelDelta / mouseDeltaFactor : event.deltaMode === 1 ? event.deltaY / deltaYFactor : event.deltaY / (deltaYFactor * 10);
	        var x, y;

	        if (scope.dollyToCursor) {
	          elementRect = scope._getClientRect(_v4);
	          x = (event.clientX - elementRect.x) / elementRect.z * 2 - 1;
	          y = (event.clientY - elementRect.y) / elementRect.w * -2 + 1;
	        }

	        switch (scope.mouseButtons.wheel) {
	          case ACTION.DOLLY:
	            {
	              dollyInternal(-delta, x, y);
	              break;
	            }

	          case ACTION.ZOOM:
	            {
	              zoomInternal(-delta, x, y);
	              break;
	            }
	        }

	        scope.dispatchEvent({
	          type: 'control',
	          originalEvent: event
	        });
	      };

	      var onContextMenu = function onContextMenu(event) {
	        if (!scope.enabled) return;
	        event.preventDefault();
	      };

	      var startDragging = function startDragging(event) {
	        if (!scope.enabled) return;
	        event.preventDefault();
	        extractClientCoordFromEvent(event, _v2);
	        elementRect = scope._getClientRect(_v4);
	        dragStart.copy(_v2);
	        var isMultiTouch = isTouchEvent(event) && event.touches.length >= 2;

	        if (isMultiTouch) {
	          // 2 finger pinch
	          var dx = _v2.x - event.touches[1].clientX;
	          var dy = _v2.y - event.touches[1].clientY;
	          var distance = Math.sqrt(dx * dx + dy * dy);
	          dollyStart.set(0, distance); // center coords of 2 finger truck

	          var x = (event.touches[0].clientX + event.touches[1].clientX) * 0.5;
	          var y = (event.touches[0].clientY + event.touches[1].clientY) * 0.5;
	          dragStart.set(x, y);
	        }

	        document.addEventListener('mousemove', dragging, {
	          passive: false
	        });
	        document.addEventListener('touchmove', dragging, {
	          passive: false
	        });
	        document.addEventListener('mouseup', endDragging);
	        document.addEventListener('touchend', endDragging);
	        scope.dispatchEvent({
	          type: 'controlstart',
	          originalEvent: event
	        });
	      };

	      var dragging = function dragging(event) {
	        if (!scope.enabled) return;
	        event.preventDefault();
	        extractClientCoordFromEvent(event, _v2);
	        var deltaX = dragStart.x - _v2.x;
	        var deltaY = dragStart.y - _v2.y;
	        dragStart.copy(_v2);

	        switch (scope._state) {
	          case ACTION.ROTATE:
	          case ACTION.TOUCH_ROTATE:
	            {
	              var theta = PI_2 * scope.azimuthRotateSpeed * deltaX / elementRect.z;
	              var phi = PI_2 * scope.polarRotateSpeed * deltaY / elementRect.w;
	              scope.rotate(theta, phi, true);
	              break;
	            }

	          case ACTION.DOLLY:
	          case ACTION.ZOOM:
	            {
	              // not implemented
	              break;
	            }

	          case ACTION.TOUCH_DOLLY:
	          case ACTION.TOUCH_ZOOM:
	          case ACTION.TOUCH_DOLLY_TRUCK:
	          case ACTION.TOUCH_ZOOM_TRUCK:
	            {
	              var TOUCH_DOLLY_FACTOR = 8;
	              var dx = _v2.x - event.touches[1].clientX;
	              var dy = _v2.y - event.touches[1].clientY;
	              var distance = Math.sqrt(dx * dx + dy * dy);
	              var dollyDelta = dollyStart.y - distance;
	              dollyStart.set(0, distance);
	              var dollyX = scope.dollyToCursor ? (dragStart.x - elementRect.x) / elementRect.z * 2 - 1 : 0;
	              var dollyY = scope.dollyToCursor ? (dragStart.y - elementRect.y) / elementRect.w * -2 + 1 : 0;

	              switch (scope._state) {
	                case ACTION.TOUCH_DOLLY:
	                case ACTION.TOUCH_DOLLY_TRUCK:
	                  {
	                    dollyInternal(dollyDelta / TOUCH_DOLLY_FACTOR, dollyX, dollyY);
	                    break;
	                  }

	                case ACTION.TOUCH_ZOOM:
	                case ACTION.TOUCH_ZOOM_TRUCK:
	                  {
	                    zoomInternal(dollyDelta / TOUCH_DOLLY_FACTOR, dollyX, dollyY);
	                    break;
	                  }
	              }

	              if (scope._state === ACTION.TOUCH_DOLLY_TRUCK || scope._state === ACTION.TOUCH_ZOOM_TRUCK) {
	                truckInternal(deltaX, deltaY);
	              }

	              break;
	            }

	          case ACTION.TRUCK:
	          case ACTION.TOUCH_TRUCK:
	            {
	              truckInternal(deltaX, deltaY);
	              break;
	            }
	        }

	        scope.dispatchEvent({
	          type: 'control',
	          originalEvent: event
	        });
	      };

	      var endDragging = function endDragging(event) {
	        if (!scope.enabled) return;
	        scope._state = ACTION.NONE;
	        document.removeEventListener('mousemove', dragging, {
	          passive: false
	        });
	        document.removeEventListener('touchmove', dragging, {
	          passive: false
	        });
	        document.removeEventListener('mouseup', endDragging);
	        document.removeEventListener('touchend', endDragging);
	        scope.dispatchEvent({
	          type: 'controlend',
	          originalEvent: event
	        });
	      };

	      var truckInternal = function truckInternal(deltaX, deltaY) {
	        if (scope._camera.isPerspectiveCamera) {
	          var offset = _v3A.copy(scope._camera.position).sub(scope._target); // half of the fov is center to top of screen


	          var fovInRad = scope._camera.getEffectiveFOV() * THREE.Math.DEG2RAD;
	          var targetDistance = offset.length() * Math.tan(fovInRad / 2);
	          var truckX = scope.truckSpeed * deltaX * targetDistance / elementRect.w;
	          var pedestalY = scope.truckSpeed * deltaY * targetDistance / elementRect.w;

	          if (scope.verticalDragToForward) {
	            scope.truck(truckX, 0, true);
	            scope.forward(-pedestalY, true);
	          } else {
	            scope.truck(truckX, pedestalY, true);
	          }
	        } else if (scope._camera.isOrthographicCamera) {
	          // orthographic
	          var _truckX = deltaX * (scope._camera.right - scope._camera.left) / scope._camera.zoom / elementRect.z;

	          var _pedestalY = deltaY * (scope._camera.top - scope._camera.bottom) / scope._camera.zoom / elementRect.w;

	          scope.truck(_truckX, _pedestalY, true);
	        }
	      };

	      var dollyInternal = function dollyInternal(delta, x, y) {
	        var dollyScale = Math.pow(0.95, -delta * scope.dollySpeed);
	        var distance = scope._sphericalEnd.radius * dollyScale;
	        var prevRadius = scope._sphericalEnd.radius;
	        scope.dollyTo(distance);

	        if (scope.dollyToCursor) {
	          scope._dollyControlAmount += scope._sphericalEnd.radius - prevRadius;

	          scope._dollyControlCoord.set(x, y);
	        }

	        return;
	      };

	      var zoomInternal = function zoomInternal(delta)
	      /* x, y */
	      {
	        var zoomScale = Math.pow(0.95, delta * scope.dollySpeed); // for both PerspectiveCamera and OrthographicCamera

	        scope.zoomTo(scope._zoom * zoomScale);
	        return;
	      };

	      var scope = _assertThisInitialized(_this);

	      var dragStart = new THREE.Vector2();
	      var dollyStart = new THREE.Vector2();
	      var elementRect;

	      _this._domElement.addEventListener('mousedown', onMouseDown);

	      _this._domElement.addEventListener('touchstart', onTouchStart);

	      _this._domElement.addEventListener('wheel', onMouseWheel);

	      _this._domElement.addEventListener('contextmenu', onContextMenu);

	      _this._removeAllEventListeners = function () {
	        scope._domElement.removeEventListener('mousedown', onMouseDown);

	        scope._domElement.removeEventListener('touchstart', onTouchStart);

	        scope._domElement.removeEventListener('wheel', onMouseWheel);

	        scope._domElement.removeEventListener('contextmenu', onContextMenu);

	        document.removeEventListener('mousemove', dragging);
	        document.removeEventListener('touchmove', dragging);
	        document.removeEventListener('mouseup', endDragging);
	        document.removeEventListener('touchend', endDragging);
	      };
	    }

	    return _this;
	  } // wrong. phi should be map to polar, but backward compatibility.


	  _createClass(CameraControls, [{
	    key: "rotate",
	    // azimuthAngle in radian
	    // polarAngle in radian
	    value: function rotate(azimuthAngle, polarAngle, enableTransition) {
	      this.rotateTo(this._sphericalEnd.theta + azimuthAngle, this._sphericalEnd.phi + polarAngle, enableTransition);
	    } // azimuthAngle in radian
	    // polarAngle in radian

	  }, {
	    key: "rotateTo",
	    value: function rotateTo(azimuthAngle, polarAngle, enableTransition) {
	      var theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, azimuthAngle));
	      var phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, polarAngle));
	      this._sphericalEnd.theta = theta;
	      this._sphericalEnd.phi = phi;

	      this._sphericalEnd.makeSafe();

	      if (!enableTransition) {
	        this._spherical.theta = this._sphericalEnd.theta;
	        this._spherical.phi = this._sphericalEnd.phi;
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "dolly",
	    value: function dolly(distance, enableTransition) {
	      this.dollyTo(this._sphericalEnd.radius - distance, enableTransition);
	    }
	  }, {
	    key: "dollyTo",
	    value: function dollyTo(distance, enableTransition) {
	      if (this._camera.isOrthographicCamera) {
	        console.warn('dolly is not available for OrthographicCamera');
	        return;
	      }

	      this._sphericalEnd.radius = THREE.Math.clamp(distance, this.minDistance, this.maxDistance);

	      if (!enableTransition) {
	        this._spherical.radius = this._sphericalEnd.radius;
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "zoom",
	    value: function zoom(zoomStep, enableTransition) {
	      this.zoomTo(this._zoomEnd + zoomStep, enableTransition);
	    }
	  }, {
	    key: "zoomTo",
	    value: function zoomTo(zoom, enableTransition) {
	      this._zoomEnd = THREE.Math.clamp(zoom, this.minZoom, this.maxZoom);

	      if (!enableTransition) {
	        this._zoom = this._zoomEnd;
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "pan",
	    value: function pan(x, y, enableTransition) {
	      console.log('`pan` has been renamed to `truck`');
	      this.truck(x, y, enableTransition);
	    }
	  }, {
	    key: "truck",
	    value: function truck(x, y, enableTransition) {
	      this._camera.updateMatrix();

	      _xColumn.setFromMatrixColumn(this._camera.matrix, 0);

	      _yColumn.setFromMatrixColumn(this._camera.matrix, 1);

	      _xColumn.multiplyScalar(x);

	      _yColumn.multiplyScalar(-y);

	      var offset = _v3A.copy(_xColumn).add(_yColumn);

	      this._encloseToBoundary(this._targetEnd, offset, this.boundaryFriction);

	      if (!enableTransition) {
	        this._target.copy(this._targetEnd);
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "forward",
	    value: function forward(distance, enableTransition) {
	      _v3A.setFromMatrixColumn(this._camera.matrix, 0);

	      _v3A.crossVectors(this._camera.up, _v3A);

	      _v3A.multiplyScalar(distance);

	      this._encloseToBoundary(this._targetEnd, _v3A, this.boundaryFriction);

	      if (!enableTransition) {
	        this._target.copy(this._targetEnd);
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "moveTo",
	    value: function moveTo(x, y, z, enableTransition) {
	      this._targetEnd.set(x, y, z);

	      if (!enableTransition) {
	        this._target.copy(this._targetEnd);
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "fitTo",
	    value: function fitTo(box3OrObject, enableTransition) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      if (this._camera.isOrthographicCamera) {
	        console.warn('fitTo is not supported for OrthographicCamera');
	        return;
	      }

	      var paddingLeft = options.paddingLeft || 0;
	      var paddingRight = options.paddingRight || 0;
	      var paddingBottom = options.paddingBottom || 0;
	      var paddingTop = options.paddingTop || 0;
	      var boundingBox = box3OrObject.isBox3 ? box3OrObject.clone() : new THREE.Box3().setFromObject(box3OrObject);
	      var size = boundingBox.getSize(_v3A);
	      var boundingWidth = size.x + paddingLeft + paddingRight;
	      var boundingHeight = size.y + paddingTop + paddingBottom;
	      var boundingDepth = size.z;
	      var distance = this.getDistanceToFit(boundingWidth, boundingHeight, boundingDepth);
	      this.dollyTo(distance, enableTransition);
	      var boundingBoxCenter = boundingBox.getCenter(_v3A);
	      var cx = boundingBoxCenter.x - (paddingLeft * 0.5 - paddingRight * 0.5);
	      var cy = boundingBoxCenter.y + (paddingTop * 0.5 - paddingBottom * 0.5);
	      var cz = boundingBoxCenter.z;
	      this.moveTo(cx, cy, cz, enableTransition);
	      this.normalizeRotations();
	      this.rotateTo(0, 90 * THREE.Math.DEG2RAD, enableTransition);
	    }
	  }, {
	    key: "setLookAt",
	    value: function setLookAt(positionX, positionY, positionZ, targetX, targetY, targetZ, enableTransition) {
	      var position = _v3A.set(positionX, positionY, positionZ);

	      var target = _v3B.set(targetX, targetY, targetZ);

	      this._targetEnd.copy(target);

	      this._sphericalEnd.setFromVector3(position.sub(target).applyQuaternion(this._yAxisUpSpace));

	      this.normalizeRotations();

	      if (!enableTransition) {
	        this._target.copy(this._targetEnd);

	        this._spherical.copy(this._sphericalEnd);
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "lerpLookAt",
	    value: function lerpLookAt(positionAX, positionAY, positionAZ, targetAX, targetAY, targetAZ, positionBX, positionBY, positionBZ, targetBX, targetBY, targetBZ, t, enableTransition) {
	      var positionA = _v3A.set(positionAX, positionAY, positionAZ);

	      var targetA = _v3B.set(targetAX, targetAY, targetAZ);

	      _sphericalA.setFromVector3(positionA.sub(targetA).applyQuaternion(this._yAxisUpSpace));

	      var targetB = _v3A.set(targetBX, targetBY, targetBZ);

	      this._targetEnd.copy(targetA).lerp(targetB, t); // tricky


	      var positionB = _v3B.set(positionBX, positionBY, positionBZ);

	      _sphericalB.setFromVector3(positionB.sub(targetB).applyQuaternion(this._yAxisUpSpace));

	      var deltaTheta = _sphericalB.theta - _sphericalA.theta;
	      var deltaPhi = _sphericalB.phi - _sphericalA.phi;
	      var deltaRadius = _sphericalB.radius - _sphericalA.radius;

	      this._sphericalEnd.set(_sphericalA.radius + deltaRadius * t, _sphericalA.phi + deltaPhi * t, _sphericalA.theta + deltaTheta * t);

	      this.normalizeRotations();

	      if (!enableTransition) {
	        this._target.copy(this._targetEnd);

	        this._spherical.copy(this._sphericalEnd);
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "setPosition",
	    value: function setPosition(positionX, positionY, positionZ, enableTransition) {
	      this.setLookAt(positionX, positionY, positionZ, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, enableTransition);
	    }
	  }, {
	    key: "setTarget",
	    value: function setTarget(targetX, targetY, targetZ, enableTransition) {
	      var pos = this.getPosition(_v3A);
	      this.setLookAt(pos.x, pos.y, pos.z, targetX, targetY, targetZ, enableTransition);
	    }
	  }, {
	    key: "setBoundary",
	    value: function setBoundary(box3) {
	      if (!box3) {
	        this._boundary.min.set(-Infinity, -Infinity, -Infinity);

	        this._boundary.max.set(Infinity, Infinity, Infinity);

	        this._hasUpdated = true;
	        return;
	      }

	      this._boundary.copy(box3);

	      this._boundary.clampPoint(this._targetEnd, this._targetEnd);

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "setViewport",
	    value: function setViewport(viewportOrX, y, width, height) {
	      if (viewportOrX === null) {
	        // null
	        this._viewport = null;
	        return;
	      }

	      this._viewport = this._viewport || new THREE.Vector4();

	      if (typeof viewportOrX === 'number') {
	        // number
	        this._viewport.set(viewportOrX, y, width, height);
	      } else {
	        // Vector4
	        this._viewport.copy(viewportOrX);
	      }
	    }
	  }, {
	    key: "getDistanceToFit",
	    value: function getDistanceToFit(width, height, depth) {
	      var camera = this._camera;
	      var boundingRectAspect = width / height;
	      var fov = camera.getEffectiveFOV() * THREE.Math.DEG2RAD;
	      var aspect = camera.aspect;
	      var heightToFit = boundingRectAspect < aspect ? height : width / aspect;
	      return heightToFit * 0.5 / Math.tan(fov * 0.5) + depth * 0.5;
	    }
	  }, {
	    key: "getTarget",
	    value: function getTarget(out) {
	      var _out = !!out && out.isVector3 ? out : new THREE.Vector3();

	      return _out.copy(this._targetEnd);
	    }
	  }, {
	    key: "getPosition",
	    value: function getPosition(out) {
	      var _out = !!out && out.isVector3 ? out : new THREE.Vector3();

	      return _out.setFromSpherical(this._sphericalEnd).applyQuaternion(this._yAxisUpSpaceInverse).add(this._targetEnd);
	    }
	  }, {
	    key: "normalizeRotations",
	    value: function normalizeRotations() {
	      this._sphericalEnd.theta = this._sphericalEnd.theta % PI_2;
	      this._spherical.theta += PI_2 * Math.round((this._sphericalEnd.theta - this._spherical.theta) / PI_2);
	    }
	  }, {
	    key: "reset",
	    value: function reset(enableTransition) {
	      this.setLookAt(this._position0.x, this._position0.y, this._position0.z, this._target0.x, this._target0.y, this._target0.z, enableTransition);
	      this.zoomTo(this._zoom0, enableTransition);
	    }
	  }, {
	    key: "saveState",
	    value: function saveState() {
	      this._target0.copy(this._target);

	      this._position0.copy(this._camera.position);

	      this._zoom0 = this._zoom;
	    }
	  }, {
	    key: "updateCameraUp",
	    value: function updateCameraUp() {
	      this._yAxisUpSpace.setFromUnitVectors(this._camera.up, _AXIS_Y);

	      this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).inverse();
	    }
	  }, {
	    key: "update",
	    value: function update(delta) {
	      var dampingFactor = this._state === ACTION.NONE ? this.dampingFactor : this.draggingDampingFactor;
	      var lerpRatio = 1.0 - Math.exp(-dampingFactor * delta / 0.016);
	      var deltaTheta = this._sphericalEnd.theta - this._spherical.theta;
	      var deltaPhi = this._sphericalEnd.phi - this._spherical.phi;
	      var deltaRadius = this._sphericalEnd.radius - this._spherical.radius;

	      var deltaTarget = _v3A.subVectors(this._targetEnd, this._target);

	      if (!approxZero(deltaTheta) || !approxZero(deltaPhi) || !approxZero(deltaRadius) || !approxZero(deltaTarget.x) || !approxZero(deltaTarget.y) || !approxZero(deltaTarget.z)) {
	        this._spherical.set(this._spherical.radius + deltaRadius * lerpRatio, this._spherical.phi + deltaPhi * lerpRatio, this._spherical.theta + deltaTheta * lerpRatio);

	        this._target.add(deltaTarget.multiplyScalar(lerpRatio));

	        this._hasUpdated = true;
	      } else {
	        this._spherical.copy(this._sphericalEnd);

	        this._target.copy(this._targetEnd);
	      }

	      if (this._dollyControlAmount !== 0) {
	        if (this._camera.isPerspectiveCamera) {
	          var direction = _v3A.copy(_v3A.setFromSpherical(this._sphericalEnd).applyQuaternion(this._yAxisUpSpaceInverse)).normalize().negate();

	          var planeX = _v3B.copy(direction).cross(_v3C.copy(this._camera.up)).normalize();

	          if (planeX.lengthSq() === 0) planeX.x = 1.0;

	          var planeY = _v3C.crossVectors(planeX, direction);

	          var worldToScreen = this._sphericalEnd.radius * Math.tan(this._camera.getEffectiveFOV() * THREE.Math.DEG2RAD * 0.5);
	          var prevRadius = this._sphericalEnd.radius - this._dollyControlAmount;

	          var _lerpRatio = (prevRadius - this._sphericalEnd.radius) / this._sphericalEnd.radius;

	          var cursor = _v3A.copy(this._targetEnd).add(planeX.multiplyScalar(this._dollyControlCoord.x * worldToScreen * this._camera.aspect)).add(planeY.multiplyScalar(this._dollyControlCoord.y * worldToScreen));

	          this._targetEnd.lerp(cursor, _lerpRatio);

	          this._target.copy(this._targetEnd);
	        }

	        this._dollyControlAmount = 0;
	      }

	      this._spherical.makeSafe();

	      this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target);

	      this._camera.lookAt(this._target);

	      if (this._boundaryEnclosesCamera) {
	        this._encloseToBoundary(this._camera.position.copy(this._target), _v3A.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1.0);
	      } // zoom


	      var zoomDelta = this._zoomEnd - this._zoom;
	      this._zoom += zoomDelta * lerpRatio;

	      if (this._camera.zoom !== this._zoom) {
	        if (approxZero(zoomDelta)) this._zoom = this._zoomEnd;
	        this._camera.zoom = this._zoom;

	        this._camera.updateProjectionMatrix();

	        this._hasUpdated = true;
	      } // if (
	      // 	this._camera.isPerspectiveCamera &&
	      // 	this._camera.fov !== this._zoom
	      // ) {
	      // }


	      var updated = this._hasUpdated;
	      this._hasUpdated = false;
	      if (updated) this.dispatchEvent({
	        type: 'update'
	      });
	      return updated;
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      return JSON.stringify({
	        enabled: this.enabled,
	        minDistance: this.minDistance,
	        maxDistance: infinityToMaxNumber(this.maxDistance),
	        minPolarAngle: this.minPolarAngle,
	        maxPolarAngle: infinityToMaxNumber(this.maxPolarAngle),
	        minAzimuthAngle: infinityToMaxNumber(this.minAzimuthAngle),
	        maxAzimuthAngle: infinityToMaxNumber(this.maxAzimuthAngle),
	        dampingFactor: this.dampingFactor,
	        draggingDampingFactor: this.draggingDampingFactor,
	        dollySpeed: this.dollySpeed,
	        truckSpeed: this.truckSpeed,
	        dollyToCursor: this.dollyToCursor,
	        verticalDragToForward: this.verticalDragToForward,
	        target: this._targetEnd.toArray(),
	        position: this._camera.position.toArray(),
	        target0: this._target0.toArray(),
	        position0: this._position0.toArray()
	      });
	    }
	  }, {
	    key: "fromJSON",
	    value: function fromJSON(json, enableTransition) {
	      var obj = JSON.parse(json);
	      var position = new THREE.Vector3().fromArray(obj.position);
	      this.enabled = obj.enabled;
	      this.minDistance = obj.minDistance;
	      this.maxDistance = maxNumberToInfinity(obj.maxDistance);
	      this.minPolarAngle = obj.minPolarAngle;
	      this.maxPolarAngle = maxNumberToInfinity(obj.maxPolarAngle);
	      this.minAzimuthAngle = maxNumberToInfinity(obj.minAzimuthAngle);
	      this.maxAzimuthAngle = maxNumberToInfinity(obj.maxAzimuthAngle);
	      this.dampingFactor = obj.dampingFactor;
	      this.draggingDampingFactor = obj.draggingDampingFactor;
	      this.dollySpeed = obj.dollySpeed;
	      this.truckSpeed = obj.truckSpeed;
	      this.dollyToCursor = obj.dollyToCursor;
	      this.verticalDragToForward = obj.verticalDragToForward;

	      this._target0.fromArray(obj.target0);

	      this._position0.fromArray(obj.position0);

	      this._targetEnd.fromArray(obj.target);

	      this._sphericalEnd.setFromVector3(position.sub(this._target0).applyQuaternion(this._yAxisUpSpace));

	      if (!enableTransition) {
	        this._target.copy(this._targetEnd);

	        this._spherical.copy(this._sphericalEnd);
	      }

	      this._hasUpdated = true;
	    }
	  }, {
	    key: "dispose",
	    value: function dispose() {
	      this._removeAllEventListeners();
	    }
	  }, {
	    key: "_encloseToBoundary",
	    value: function _encloseToBoundary(position, offset, friction) {
	      var offsetLength2 = offset.lengthSq();

	      if (offsetLength2 === 0.0) {
	        // sanity check
	        return position;
	      } // See: https://twitter.com/FMS_Cat/status/1106508958640988161


	      var newTarget = _v3B.copy(offset).add(position); // target


	      var clampedTarget = this._boundary.clampPoint(newTarget, _v3C); // clamped target


	      var deltaClampedTarget = clampedTarget.sub(newTarget); // newTarget -> clampedTarget

	      var deltaClampedTargetLength2 = deltaClampedTarget.lengthSq(); // squared length of deltaClampedTarget

	      if (deltaClampedTargetLength2 === 0.0) {
	        // when the position doesn't have to be clamped
	        return position.add(offset);
	      } else if (deltaClampedTargetLength2 === offsetLength2) {
	        // when the position is completely stuck
	        return position;
	      } else if (friction === 0.0) {
	        return position.add(offset).add(deltaClampedTarget);
	      } else {
	        var offsetFactor = 1.0 + friction * deltaClampedTargetLength2 / offset.dot(deltaClampedTarget);
	        return position.add(_v3B.copy(offset).multiplyScalar(offsetFactor)).add(deltaClampedTarget.multiplyScalar(1.0 - friction));
	      }
	    }
	    /**
	     * Get its client rect and package into given `THREE.Vector4` .
	     */

	  }, {
	    key: "_getClientRect",
	    value: function _getClientRect(target) {
	      var rect = this._domElement.getBoundingClientRect();

	      target.x = rect.left;
	      target.y = rect.top;

	      if (this._viewport) {
	        target.x += this._viewport.x;
	        target.y += rect.height - this._viewport.w - this._viewport.y;
	        target.z = this._viewport.z;
	        target.w = this._viewport.w;
	      } else {
	        target.z = rect.width;
	        target.w = rect.height;
	      }

	      return target;
	    }
	  }, {
	    key: "phiSpeed",
	    set: function set(speed) {
	      console.warn('phiSpeed was renamed. use azimuthRotateSpeed instead');
	      this.azimuthRotateSpeed = speed;
	    } // wrong. theta should be map to azimuth, but backward compatibility.

	  }, {
	    key: "thetaSpeed",
	    set: function set(speed) {
	      console.warn('thetaSpeed was renamed. use polarRotateSpeed instead');
	      this.polarRotateSpeed = speed;
	    }
	  }, {
	    key: "boundaryEnclosesCamera",
	    get: function get() {
	      return this._boundaryEnclosesCamera;
	    },
	    set: function set(boundaryEnclosesCamera) {
	      this._boundaryEnclosesCamera = boundaryEnclosesCamera;
	      this._hasUpdated = true;
	    }
	  }]);

	  return CameraControls;
	}(EventDispatcher);

	function extractClientCoordFromEvent(event, out) {
	  out.set(0, 0);

	  if (isTouchEvent(event)) {
	    for (var i = 0; i < event.touches.length; i++) {
	      out.x += event.touches[i].clientX;
	      out.y += event.touches[i].clientY;
	    }

	    out.x /= event.touches.length;
	    out.y /= event.touches.length;
	    return out;
	  } else {
	    out.set(event.clientX, event.clientY);
	    return out;
	  }
	}

	function isTouchEvent(event) {
	  return 'TouchEvent' in window && event instanceof TouchEvent;
	}

	function approxZero(number) {
	  return Math.abs(number) < EPSILON;
	}

	function infinityToMaxNumber(value) {
	  if (isFinite(value)) return value;
	  if (value < 0) return -Number.MAX_VALUE;
	  return Number.MAX_VALUE;
	}

	function maxNumberToInfinity(value) {
	  if (Math.abs(value) < Number.MAX_VALUE) return value;
	  return value * Infinity;
	}

	return CameraControls;

})));
