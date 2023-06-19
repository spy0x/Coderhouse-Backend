export function isUser(req: any, res: any, next: any) {
    if (req.session?.user?.email) {
      return next();
    }
    return res.status(401).render('error', { status: "ERROR 401", message: 'AUTHENTICATION REQUIRED' });
  }
  
  export function isAdmin(req: any, res: any, next: any) {
    if (req.session?.user?.role === 'admin') {
      return next();
    }
    return res.status(403).render('error', { status: "ERROR 403", message: 'AUTHORIZATION DENIED' });
  }