# AI Coding Agent Instructions for Basic Scheduling System

## Architecture Overview

This is a **multi-tenant NestJS scheduling system** with MongoDB persistence. The system is designed around business entities: `accounts` (tenants), `users`, `professionals`, `clients`, and `appointments`.

**Key Architectural Patterns:**

- **Multi-tenancy via `accountId`**: Every entity (except `Account`) includes an `accountId` field for tenant isolation
- **Global JWT Authentication**: All endpoints require Bearer auth except those marked with `@Public()` decorator
- **Service Layer Pattern**: Controllers delegate to services, services handle business logic and database operations
- **Global Response Wrapping**: All responses are wrapped in `{ data: ... }` format via `ResponseInterceptor`

## Essential Development Workflows

### Local Development Setup

```bash
# Database (required first)
docker-compose up -d

# Development server with hot reload
npm run start:dev

# API documentation available at http://localhost:3000/swagger
```

### Testing Commands

```bash
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run test:cov    # Coverage report
```

## Code Patterns & Conventions

### Authentication Flow

- Global `AuthGuard` protects all routes by default
- Use `@Public()` decorator for unprotected endpoints (login, register)
- Extract user context with `@UserSession()` parameter decorator:

```typescript
@Post()
create(@Body() dto: CreateDto, @UserSession() user: UserSession) {
  return this.service.create({ ...dto, accountId: user.accountId });
}
```

### MongoDB Schema Pattern

All domain schemas follow this structure:

```typescript
@Schema({ timestamps: true })
export class EntityName {
  @Prop()
  accountId: ObjectId; // Multi-tenancy field (required for most entities)

  // Entity-specific fields...
}

export const EntitySchema = SchemaFactory.createForClass(EntityName).index(
  { accountId: 1 /* other fields */ },
  { unique: true },
);
```

### DTO Validation Pattern

- Use `class-validator` decorators for validation
- Include Swagger `@ApiProperty()` for documentation
- Transform query parameters with `@Transform()`:

```typescript
export class PaginationQueryDto {
  @Transform((value) => Number(value) || 1)
  @IsOptional()
  page: number;
}
```

### Service Layer Pattern

Services handle database operations and business logic:

```typescript
@Injectable()
export class EntityService {
  constructor(
    @InjectModel(Entity.name) private entityModel: Model<Entity>,
    private readonly relatedService: RelatedService, // Inject related services
  ) {}

  async create(dto: CreateDto) {
    // Always include accountId filtering for multi-tenancy
    return this.entityModel.create(dto);
  }

  async findAll(accountId: string) {
    return this.entityModel.find({ accountId });
  }
}
```

## Critical Integration Points

### Multi-Tenant Data Access

**CRITICAL**: All database queries must include `accountId` filtering to ensure tenant isolation:

```typescript
// Correct - tenant-isolated
this.model.find({ accountId, ...otherFilters });

// WRONG - cross-tenant data leak
this.model.find({ ...otherFilters });
```

### Embedded Document Pattern

Appointments use embedded documents for `professional` and `client` references:

```typescript
@Prop(raw({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String },
}))
professional: Record<string, any>;
```

### Cross-Service Dependencies

- `AppointmentsService` depends on both `ProfessionalsService` and `ClientsService`
- Services resolve references using `Promise.all()` for performance
- Always pass `accountId` when calling cross-service methods

## Module Structure

- `/auth` - JWT authentication, guards, decorators
- `/users` - User management within accounts
- `/accounts` - Multi-tenant account management
- `/professionals` - Healthcare providers/staff
- `/clients` - Customer/patient management
- `/appointments` - Scheduling core functionality
- `/libs` - Shared utilities (hashing service)
- `/common` - Shared DTOs (pagination)

## Environment Dependencies

- `MONGODB_URI` - Database connection (use docker-compose for local dev)
- `JWT_SECRET` - Token signing secret
- `PORT` - Server port (defaults to 3000)

## Testing Conventions

- Unit tests use Jest with `.spec.ts` suffix
- E2E tests in `/test` directory with `.e2e-spec.ts` suffix
- Mock external dependencies in unit tests
- Use `@nestjs/testing` module for test setup
