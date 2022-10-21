export { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js'
export { Scene } from 'three/src/scenes/Scene.js'
export { Mesh } from 'three/src/objects/Mesh.js'
export { Group } from 'three/src/objects/Group.js'
export { Texture } from 'three/src/textures/Texture.js'

export { Material } from 'three/src/materials/Material.js'
export { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js'
export { TorusGeometry } from 'three/src/geometries/TorusGeometry.js'
export { BoxGeometry } from 'three/src/geometries/BoxGeometry.js'

export { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js'
export { OrthographicCamera } from 'three/src/cameras/OrthographicCamera.js'
export { Camera } from 'three/src/cameras/Camera.js'
export { Raycaster } from 'three/src/core/Raycaster.js'
export { Layers } from 'three/src/core/Layers.js'
export { Clock } from 'three/src/core/Clock.js'
export { BufferGeometry } from 'three/src/core/BufferGeometry'
export { Vector3 } from 'three/src/math/Vector3.js'
export { Vector2 } from 'three/src/math/Vector2.js'
export { Color } from 'three/src/math/Color.js'
export { REVISION, sRGBEncoding, PCFSoftShadowMap, LinearEncoding, NoToneMapping, ACESFilmicToneMapping } from 'three/src/constants.js'

if (typeof __THREE_DEVTOOLS__ !== 'undefined') {

    /* eslint-disable no-undef */
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('register', {
        detail: {
            revision: REVISION,
        }
    }))
    /* eslint-enable no-undef */

}
