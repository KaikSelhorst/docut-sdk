# Link Service

Service for managing links in the Docut API.

## Available Methods

### `create(req: CreatelinkRequest)`
Creates a new link.

**Parameters:**
- `req` - Data of the link to be created

**Returns:** Promise with the created link

### `get(req: GetLinkRequest)`
Gets a specific link by ID.

**Parameters:**
- `req.id` - Link ID

**Returns:** Promise with link data

### `update(req: UpdateLinkRequest)`
Updates an existing link.

**Parameters:**
- `req.id` - Link ID
- `req` - New link data

**Returns:** Promise with the updated link

### `delete(req: DeleteLinkRequest)`
Removes a link.

**Parameters:**
- `req.id` - Link ID

**Returns:** Promise with confirmation

### `list(req?: ListLinkRequest)`
Lists all links (with optional filters).

**Parameters:**
- `req` - Optional filters (optional)

**Returns:** Promise with list of links

### `getPublic(req: GetPublicLinkRequest)`
Gets information about a public link.

**Parameters:**
- `req.id` - Public link ID

**Returns:** Promise with public link data

## Usage Example

```typescript
import { DocutSDK } from '@docut/nodejs-sdk';

const sdk = new DocutSDK('https://docut.xyz/api', 'your-api-key');

// Create link
const newLink = await sdk.link.create({
  url: 'https://example.com',
  seo: {
    title: 'My Link',
    description: 'Link description',
  }
});

// Get link
const link = await sdk.link.get({ id: 'abc123' });

// List links
const links = await sdk.link.list();

// Update link
const updatedLink = await sdk.link.update({
  id: 'abc123',
  seo: {
    title: 'Updated Title'
  }
});

// Delete link
await sdk.link.delete({ id: 'abc123' });

// Get public link
const publicLink = await sdk.link.getPublic({ id: 'abc123' });
```
