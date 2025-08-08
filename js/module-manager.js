/**
 * Module Manager - Quản lý việc khởi tạo các module
 */

// Danh sách các module cần khởi tạo
const MODULES = [
  {
    name: 'nav-active',
    importPath: './nav-active.js',
    initFunction: 'initNavActive',
    required: true
  },
  {
    name: 'nav-scroll',
    importPath: './nav-scroll.js',
    initFunction: 'initNavScroll',
    required: true
  },
  {
    name: 'search-typewriter', 
    importPath: './search-typewriter.js',
    initFunction: 'initSearchTypewriter',
    required: false
  },
  {
    name: 'floating-icons',
    importPath: './floating-icons.js',
    initFunction: 'initFloatingIcons',
    required: false
  }
];

/**
 * Khởi tạo tất cả các module
 */
export async function initializeAllModules() {
  for (const module of MODULES) {
    try {
      await initializeModule(module);
    } catch (error) {
      console.error(`Failed to initialize ${module.name}:`, error);
      
      if (module.required) {
        throw error; // Nếu module bắt buộc thì dừng lại
      }
    }
  }
}

/**
 * Khởi tạo một module cụ thể
 */
async function initializeModule(moduleConfig) {
  const { name, importPath, initFunction, required } = moduleConfig;
  
  try {
    const module = await import(importPath);
    
    if (typeof module[initFunction] === 'function') {
      module[initFunction]();
    } else {
      const error = `${initFunction}() not found in ${name}`;
      console.error(`❌ ${error}`);
      if (required) throw new Error(error);
    }
  } catch (error) {
    console.error(`❌ Failed to load ${name}:`, error);
    if (required) throw error;
  }
}

/**
 * Khởi tạo module với delay để đảm bảo DOM ready
 */
export async function initializeModulesWithDelay(delay = 100) {
  await new Promise(resolve => setTimeout(resolve, delay));
  await initializeAllModules();
}
