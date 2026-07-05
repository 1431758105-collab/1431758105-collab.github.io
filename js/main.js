// ===== 视角切换 =====
const RESUME_MAP = {
  finance: 'assets/resume/wangshiwei-finance.pdf',
  tech: 'assets/resume/wangshiwei-tech.pdf'
};
const JOB_STATUS_MAP = {
  finance: '27届秋招进行中 · 期望方向：二级市场研究 / 机构销售',
  tech: '27届秋招进行中 · 期望方向：AI产品经理 / 商务销售 / 管培'
};

let currentView = 'tech';

function setView(view) {
  currentView = view;

  // 同步所有 view-btn（导航栏 + Hero）
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  // 过滤实习经历卡片
  document.querySelectorAll('.exp-card').forEach(card => {
    card.classList.toggle('visible', card.dataset.view === view);
  });

  // 更新简历下载链接
  const resumeBtn = document.getElementById('resume-download');
  if (resumeBtn) resumeBtn.setAttribute('href', RESUME_MAP[view]);

  // 更新求职状态文案
  const jobStatus = document.getElementById('job-status');
  if (jobStatus) {
    jobStatus.style.opacity = 0;
    setTimeout(() => {
      jobStatus.textContent = JOB_STATUS_MAP[view];
      jobStatus.style.opacity = 1;
    }, 200);
  }
}

document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => setView(btn.dataset.view));
});

setView(currentView);

// ===== 实习经历卡片展开/收起 =====
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.exp-card').classList.toggle('expanded');
  });
});

// ===== 滚动渐入 =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== 旅行画廊：鼠标拖动横滑 =====
const gallery = document.getElementById('travel-gallery');
if (gallery) {
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.classList.add('dragging');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });
  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('dragging');
  });
  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('dragging');
  });
  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.2;
    gallery.scrollLeft = scrollLeft - walk;
  });
}
