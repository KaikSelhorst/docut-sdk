export type GetVisitorsResponseSuccess = {
  data: Array<{ date: string; visitors: string; views: string }>;
};

export interface GetDevicesResponseSuccess {
  data: Array<{
    device: 'desktop' | 'mobile' | null;
    total: number;
  }>;
}

export type GetOsResponseSuccess = {
  data: Array<{ os: string | null; total: number }>;
};

export interface GetContriesResponseSuccess {
  data: Array<{ country: string | null; total: number }>;
}

export interface GetBrowsersResponseSuccess {
  data: Array<{ browser: string | null; total: number }>;
}

export interface GetCitiesResponseSuccess {
  data: Array<{ city: string | null; country: string | null; total: number }>;
}
