import { REVISION } from 'three/src/constants.js';

export { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
export { Scene } from 'three/src/scenes/Scene.js';
export { Mesh } from 'three/src/objects/Mesh.js';
export { Group } from 'three/src/objects/Group.js';
export { Texture } from 'three/src/textures/Texture.js';

// Export only the geometries and materials that I need
// export * from 'three/src/geometries/Geometries.js';
// export * from 'three/src/materials/Materials.js';
export * from 'three/src/materials/MeshBasicMaterial';
export * from 'three/src/geometries/TorusGeometry';

export { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js';
// export { OrthographicCamera } from 'three/src/cameras/OrthographicCamera.js'; //GENERATES ERRORS
export { Camera } from 'three/src/cameras/Camera.js';
export { Raycaster } from 'three/src/core/Raycaster.js';
export { Layers } from 'three/src/core/Layers.js';
export { Clock } from 'three/src/core/Clock.js';
export { Vector3 } from 'three/src/math/Vector3.js';
export { Vector2 } from 'three/src/math/Vector2.js';
export { Color } from 'three/src/math/Color.js';
export * from 'three/src/constants.js';

if (typeof __THREE_DEVTOOLS__ !== 'undefined') {

	/* eslint-disable no-undef */
	__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('register', {
		detail: {
			revision: REVISION,
		}
	}));
	/* eslint-enable no-undef */

}

if (typeof window !== 'undefined') {

	if (window.__THREE__) {

		console.warn('WARNING: Multiple instances of Three.js being imported.');

	} else {

		window.__THREE__ = REVISION;

	}

}
