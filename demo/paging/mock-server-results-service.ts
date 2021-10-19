import { PagedData } from './model/paged-data';
import { CorporateEmployee } from './model/corporate-employee';
import { Page } from './model/page';
const companyData = require('../../assets/data/company.json');

/**
 * A server used to mock a paged data result from a server
 */
export class MockServerResultsService {

    constructor(private timeout: number = 0) {
    }

    /**
     * A method that mocks a paged server response
     * @param page The selected page
     * @returns {any} An observable containing the employee data
     */
    public getResults(page: Page, timeout: number = 0): Promise<PagedData<CorporateEmployee>> {
        return this.getPagedData(page, timeout);
    }

    /**
     * Package companyData into a PagedData object based on the selected Page
     * @param page The page data used to get the selected data from companyData
     * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
     */
    private async getPagedData(page: Page, timeout: number = 0): Promise<PagedData<CorporateEmployee>> {
        if (timeout) {
            await this.delay(timeout);
        }
        const pagedData = new PagedData<CorporateEmployee>();
        page.totalElements = companyData.length;
        page.totalPages = page.totalElements / page.size;
        const start = page.pageNumber * page.size;
        const end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++) {
            const jsonObj = companyData[i];
            // tslint:disable-next-line:max-line-length
            const employee = new CorporateEmployee(jsonObj.id, jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
            pagedData.data.push(employee);
        }
        pagedData.page = page;
        let resolveFunc: (data: PagedData<CorporateEmployee>) => void;
        const promise = new Promise<PagedData<CorporateEmployee>>(
            resolve => (resolveFunc = resolve)
          );
        setTimeout(() => resolveFunc(pagedData), this.timeout);
        return promise;
    }

    private delay(timeout: number): Promise<{}> {
        let resolveFunc: (value?: unknown) => void;;
        const promise = new Promise(resolve => (resolveFunc = resolve));
        setTimeout(() => resolveFunc(), timeout);
        return promise;
    }

}
