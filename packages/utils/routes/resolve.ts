export function resolveRoutes(tenantName: string, pathname: string): string {
  if (pathname[1] === '_') {
    return `/shared/${pathname.substring(2)}`;
  }
  return pathname === '/' ? `/${tenantName}` : `/${tenantName}${pathname}`;
}

export default resolveRoutes;
