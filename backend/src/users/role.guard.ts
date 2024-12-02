import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private requiredRole: 'user' | 'superuser') {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.type !== this.requiredRole) {
      throw new ForbiddenException("Vous n'avez pas les droits nécessaires.");
    }

    return true;
  }
}
