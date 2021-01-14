let oldMinute = 0;
let width = 600;
let height = width;

function setup() {
	createCanvas(height, width); // make an HTML canvas element width x height pixels
}

function draw() {
    let s = second();
    let m = minute();
    let h = hour();
  
    if (m != oldMinute) {
      oldMinute = m;
      console.log(m);
    }
    
	background(239, 251, 254);
    resetStroke();  
  
    // hour square
    fill(190, 228, 228);
    let scaledHour = scaleRange(h, 0, 24, 0, width);
    let vtxHour = [
      [scaledHour, 0],
      [width, scaledHour],
      [width - scaledHour, height],
      [0, height - scaledHour]
    ];
    beginShape();
    vtxHour.map(vtx => vertex(...vtx));
    endShape(CLOSE);
  
    // minute square
    fill(254, 246, 220);
    let scaledMinute = scaleRange(m, 0, 60, 0.0, 1.0);
    beginShape();
    let vtxMin = vtxHour.map((vtx, i) => {
      let cVtx = vtx;
      let nVtx = vtxHour[(i+1) % vtxHour.length];
      let x = (cVtx[0] - nVtx[0]) * (1 - scaledMinute) + nVtx[0];
      let y = (cVtx[1] - nVtx[1]) * (1 - scaledMinute) + nVtx[1];
      vertex(x,y);
      return [x,y];
    }); 
    endShape(CLOSE);
  
    // second square
    fill(247, 203, 202);
    let scaledSec = scaleRange(s, 0, 60, 0.0, 1.0);
    beginShape();
    let vtxSec = vtxMin.map((vtx, i) => {
      let cVtx = vtx;
      let nVtx = vtxMin[(i+1) % vtxMin.length];
      let x = (cVtx[0] - nVtx[0]) * (1 - scaledSec) + nVtx[0];
      let y = (cVtx[1] - nVtx[1]) * (1 - scaledSec) + nVtx[1];
      vertex(x,y);
      return [x,y];
    }); 
    endShape(CLOSE);
  
  
    // lines
    stroke(212, 211, 247)
    strokeWeight(4);
  
    line(0, 2, vtxHour[0][0], vtxHour[0][1]+2);
    line(...vtxHour[0], ...vtxMin[0]);
    line(...vtxMin[0], ...vtxSec[0]);
    resetStroke();
  
    // dots
    noStroke();
    fill(255, 255, 255);
    circle(vtxHour[0][0], vtxHour[0][1]+2.5, 5);
    circle(...vtxMin[0],  5);
    circle(...vtxSec[0],  5);
}

function scaleRange(x, minA, maxA, minB, maxB) {
  return (x - minA) * (maxB - minB) / (maxA - minA) + minB;
}

function resetStroke() {
  stroke(255,255,255);
  strokeWeight(1);
}
