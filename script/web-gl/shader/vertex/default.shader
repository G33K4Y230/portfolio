precision mediump float;

attribute vec3 aPosition;
attribute vec2 aUV;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 uv;


void main() {
     uv = aUV;
     gl_Position =  uModelMatrix * vec4(aPosition, 1.0);
}
