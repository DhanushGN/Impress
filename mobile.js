let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  currentX = 0;
  currentY = 0;

  init(paper) {
    // Touch start event for mobile devices
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.startX = e.touches[0].clientX - this.currentX;
      this.startY = e.touches[0].clientY - this.currentY;
    });

    // Touch move event for mobile devices
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (this.holdingPaper) {
        this.moveX = e.touches[0].clientX;
        this.moveY = e.touches[0].clientY;

        this.currentX = this.moveX - this.startX;
        this.currentY = this.moveY - this.startY;

        paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px)`;
      }
    });

    // Touch end event to stop dragging
    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper.image'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
