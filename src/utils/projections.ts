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
  const matrix = [...Array(matrixSize)].map(() =>
    [...Array(matrixSize)].map(() => " ")
  );

  const center = matrixSize / 2;
  const cubeSize = Math.min(matrixSize / 4, 15);

  // 8 vertices of a cube
  const vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1], // back face
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1], // front face
  ];

  // 12 edges of the cube (connecting vertices)
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0], // back face edges
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4], // front face edges
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7], // connecting edges
  ];

  // Rotation functions
  function rotateX(point: number[], angle: number): number[] {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0],
      point[1] * cos - point[2] * sin,
      point[1] * sin + point[2] * cos,
    ];
  }

  function rotateY(point: number[], angle: number): number[] {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0] * cos + point[2] * sin,
      point[1],
      -point[0] * sin + point[2] * cos,
    ];
  }

  function rotateZ(point: number[], angle: number): number[] {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0] * cos - point[1] * sin,
      point[0] * sin + point[1] * cos,
      point[2],
    ];
  }

  // Apply rotations and project to 2D
  const projectedVertices = vertices.map((vertex) => {
    // Scale the vertex
    let point = vertex.map((coord) => coord * cubeSize);

    // Apply rotations
    point = rotateX(point, angleX);
    point = rotateY(point, angleY);
    point = rotateZ(point, angleZ);

    // Simple orthographic projection (no perspective)
    const x = Math.round(point[0] + center);
    const y = Math.round(point[1] + center);
    const z = point[2];

    return { x, y, z };
  });

  // Draw edges
  function drawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    char: string
  ) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    let x = x0;
    let y = y0;

    while (true) {
      if (x >= 0 && x < matrixSize && y >= 0 && y < matrixSize) {
        matrix[y][x] = char;
      }

      if (x === x1 && y === y1) break;

      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
  }

  // Sort edges by average Z depth (for simple depth sorting)
  const edgesWithDepth = edges.map(([i, j]) => {
    const v1 = projectedVertices[i];
    const v2 = projectedVertices[j];
    const avgZ = (v1.z + v2.z) / 2;
    return { edge: [i, j], avgZ, v1, v2 };
  });

  // Sort by depth (draw back edges first)
  edgesWithDepth.sort((a, b) => a.avgZ - b.avgZ);

  // Draw all edges
  edgesWithDepth.forEach(({ v1, v2 }) => {
    // Use different characters based on depth for visual effect
    const char = v1.z + v2.z > 0 ? "#" : ".";
    drawLine(v1.x, v1.y, v2.x, v2.y, char);
  });

  return matrix;
}
