uniform float uTime;

vec3 newPosition;

void main(){

    newPosition = position;

    // newPosition.z += newPosition.x * cos(newPosition.x * 5. * newPosition.y * newPosition.x * 50. + uTime) * 0.2;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    
}