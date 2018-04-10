export async function loadComponent(path) {
  return (await import(`/components/${path}.js`)).default;
}
