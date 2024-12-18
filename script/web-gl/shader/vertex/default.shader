precision mediump float;

attribute vec3 aPosition;
attribute vec2 aUV;

varying vec2 uv;

void main() {
     uv = aUV;
     gl_Position = vec4(aPosition, 1.0);
}
