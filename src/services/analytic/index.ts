import type { Http } from '../../http';
import type { APIError } from '../types';
import type {
  GetBrowsersResponseSuccess,
  GetCitiesResponseSuccess,
  GetContriesResponseSuccess,
  GetDevicesResponseSuccess,
  GetOsResponseSuccess,
  GetVisitorsResponseSuccess,
} from './protocols';

export class AnalyticService {
  constructor(private readonly http: Http) {}

  public getVisitors() {
    return this.http.request<GetVisitorsResponseSuccess, APIError>(
      '/dashboard/link/metrics/visitors'
    );
  }

  public getDevices() {
    return this.http.request<GetDevicesResponseSuccess, APIError>(
      `/dashboard/link/metrics/device`
    );
  }

  public getOs() {
    return this.http.request<GetOsResponseSuccess, APIError>(
      `/dashboard/link/metrics/os`
    );
  }

  public getCountries() {
    return this.http.request<GetContriesResponseSuccess, APIError>(
      `/dashboard/link/metrics/country`
    );
  }

  public getBrowsers() {
    return this.http.request<GetBrowsersResponseSuccess, APIError>(
      '/dashboard/link/metrics/browser'
    );
  }

  public getCities() {
    return this.http.request<GetCitiesResponseSuccess, APIError>(
      `/dashboard/link/metrics/city`
    );
  }
}
