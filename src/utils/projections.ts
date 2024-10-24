const pi = 3.14;
const luminance = ".,-~:;=!*#$@";

export function getDonutMatrix(A: number, B: number, matrixSize: number) {
  const pi = 3.14;
  const luminance = ".,-~:;=!*#$@";
  const R1 = 1;
  const R2 = 2;
  const K2 = 5;
  const K1 = (matrixSize * K2 * 3) / (8 * (R1 + R2));
  const matrix = [...Array(matrixSize)].map(() =>
    [...Array(matrixSize)].map(() => " ")
  );
  const zBuffer = [...Array(matrixSize)].map(() =>
    [...Array(matrixSize)].map(() => 0)
  );

  const cosA = Math.cos(A);
  const sinA = Math.sin(A);
  const cosB = Math.cos(B);
  const sinB = Math.sin(B);

  for (let theta = 0; theta < 2 * pi; theta += 0.05) {
    const sintheta = Math.sin(theta);
    const costheta = Math.cos(theta);
    for (let phi = 0; phi < 2 * pi; phi += 0.05) {
      const cosphi = Math.cos(phi);
      const sinphi = Math.sin(phi);

      const circlex = R2 + R1 * costheta;
      const circley = R1 * sintheta;

      const x =
        circlex * (cosB * cosphi + sinA * sinB * sinphi) -
        circley * cosA * sinB;
      const y =
        circlex * (sinB * cosphi - sinA * cosB * sinphi) +
        circley * cosA * cosB;
      const z = K2 + cosA * circlex * sinphi + circley * sinA;
      const ooz = 1 / z;

      const xp = Math.floor(matrixSize / 2 + K1 * ooz * x);
      const yp = Math.floor(matrixSize / 2 - K1 * ooz * y);

      let L =
        cosphi * costheta * sinB -
        cosA * costheta * sinphi -
        sinA * sintheta +
        cosB * (cosA * sintheta - costheta * sinA * sinphi);
      L = (L + 1.5) * 4;
      if (L > 0) {
        if (ooz > zBuffer[yp][xp]) {
          zBuffer[yp][xp] = ooz;
          const luminanceIndex = Math.floor(L);
          matrix[yp][xp] = luminance.charAt(luminanceIndex);
        }
      }
    }
  }
  return matrix;
}

export function getCubeMatrix(
  angleX: number,
  angleY: number,
  angleZ: number,
  matrixSize: number
) {
  const size = matrixSize;
  const cubeSize = 15; // Size of the cube
  const center = Math.floor(size / 2);

  const matrix = [...Array(matrixSize)].map(() =>
    [...Array(matrixSize)].map(() => " ")
  );

  const vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ].map((v: any) => v.map((coord: number) => (coord * cubeSize) / 2));

  const faces = [
    [[0, 1, 2, 3], "@"], // front
    [[4, 5, 6, 7], "."], // back
    [[0, 4, 7, 3], "("], // left
    [[1, 5, 6, 2], ")"], // right
    [[0, 1, 5, 4], "_"], // top
    [[3, 2, 6, 7], "_"], // bottom
  ];

  // Perspective projection parameters
  const focalLength = 10;
  const distance = 15;

  // Rotation matrices
  const cosX = Math.cos(angleX),
    sinX = Math.sin(angleX);
  const cosY = Math.cos(angleY),
    sinY = Math.sin(angleY);
  const cosZ = Math.cos(angleZ),
    sinZ = Math.sin(angleZ);

  function rotatePoint(x: number, y: number, z: number) {
    const x1 = x * (cosY * cosZ + sinX * sinY * sinZ) - y * cosX * sinZ;
    const y1 = x * (cosY * sinZ - sinX * sinY * cosZ) + y * cosX * cosZ;
    const z1 = focalLength + x * (cosX * sinY) + y * sinX;

    return [x1, y1, z1];
  }

  // Rotation functions for each axis
  function rotateX(point: number[]) {
    const [x, y, z] = point;
    return [
      x,
      y * Math.cos(angleX) - z * Math.sin(angleX),
      y * Math.sin(angleX) + z * Math.cos(angleX),
    ];
  }

  function rotateY(point: number[]) {
    const [x, y, z] = point;
    return [
      x * Math.cos(angleY) + z * Math.sin(angleY),
      y,
      -x * Math.sin(angleY) + z * Math.cos(angleY),
    ];
  }

  function rotateZ(point: number[]) {
    const [x, y, z] = point;
    return [
      x * Math.cos(angleZ) - y * Math.sin(angleZ),
      x * Math.sin(angleZ) + y * Math.cos(angleZ),
      z,
    ];
  }

  // Combine all rotations (order: Y -> X -> Z)
  function rotate(point: number[]) {
    return rotateZ(rotateX(rotateY(point)));
  }

  // Project 3D point to 2D
  function projectPoint(x: number, y: number, z: number) {
    const scale = focalLength / (z + distance);
    return [Math.round(x * scale + center), Math.round(y * scale + center)];
  }

  // Fill polygon in matrix
  function fillPolygon(points2D: number[][], faceNum: string) {
    // Simple implementation using bounding box
    const xs = points2D.map((p) => p[0]);
    const ys = points2D.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    // Check if point is inside polygon
    function isInside(x: number, y: number, points: number[][]) {
      let inside = false;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i][0],
          yi = points[i][1];
        const xj = points[j][0],
          yj = points[j][1];

        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    }

    // Fill the polygon
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
          if (isInside(x, y, points2D)) {
            matrix[y][x] = faceNum;
          }
        }
      }
    }
  }

  // Project and draw each face
  for (const [vertexIndices, faceNum] of faces) {
    // First rotate the points, then project them
    // @ts-ignore
    const points3D = vertexIndices.map((i) => vertices[i]).map(rotate);
    const points2D = points3D.map(([x, y, z]: number[]) =>
      projectPoint(x, y, z)
    );
    // @ts-ignore
    fillPolygon(points2D, faceNum);
  }

  // console.log(matrix);
  return matrix;
}
