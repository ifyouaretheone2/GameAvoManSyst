// 图片懒加载工具
export const lazyLoadImage = (imgElement, src) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px' // 提前50px开始加载
  });

  observer.observe(imgElement);
};

// 批量懒加载图片
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-lazy]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.lazy;
        
        // 创建新图片对象预加载
        const newImg = new Image();
        newImg.onload = () => {
          img.src = src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        };
        newImg.onerror = () => {
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="800"%3E%3Crect fill="%231a1a1a" width="600" height="800"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3E图片加载失败%3C/text%3E%3C/svg%3E';
          img.classList.add('error');
          imageObserver.unobserve(img);
        };
        newImg.src = src;
      }
    });
  }, {
    rootMargin: '100px'
  });

  images.forEach(img => imageObserver.observe(img));
};

// 预加载图片
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 响应式图片加载
export const loadResponsiveImage = (imgElement, srcSet) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const screenWidth = window.innerWidth;
        
        // 根据屏幕宽度选择合适的图片
        let selectedSrc = srcSet.default;
        for (const [breakpoint, src] of Object.entries(srcSet)) {
          if (breakpoint !== 'default' && screenWidth <= parseInt(breakpoint)) {
            selectedSrc = src;
            break;
          }
        }
        
        img.src = selectedSrc;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  observer.observe(imgElement);
};
