# Analytics Service

Service for retrieving analytics and metrics data from the Docut API.

## Available Methods

### `getVisitors()`
Gets visitor analytics data including dates, visitor counts, and view counts.

**Returns:** Promise with visitor analytics data

**Response Format:**
```typescript
{
  data: Array<{
    date: string;
    visitors: string;
    views: string;
  }>
}
```

### `getDevices()`
Gets device analytics data showing the distribution of desktop vs mobile usage.

**Returns:** Promise with device analytics data

**Response Format:**
```typescript
{
  data: Array<{
    device: 'desktop' | 'mobile' | null;
    total: number;
  }>
}
```

### `getOs()`
Gets operating system analytics data showing the distribution of different operating systems.

**Returns:** Promise with OS analytics data

**Response Format:**
```typescript
{
  data: Array<{
    os: string | null;
    total: number;
  }>
}
```

### `getCountries()`
Gets country analytics data showing the geographic distribution of visitors.

**Returns:** Promise with country analytics data

**Response Format:**
```typescript
{
  data: Array<{
    country: string | null;
    total: number;
  }>
}
```

### `getBrowsers()`
Gets browser analytics data showing the distribution of different web browsers.

**Returns:** Promise with browser analytics data

**Response Format:**
```typescript
{
  data: Array<{
    browser: string | null;
    total: number;
  }>
}
```

### `getCities()`
Gets city analytics data showing the geographic distribution of visitors by city.

**Returns:** Promise with city analytics data

**Response Format:**
```typescript
{
  data: Array<{
    city: string | null;
    country: string | null;
    total: number;
  }>
}
```