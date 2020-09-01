import { TaskFunction, CredentialProps, JSONToGoogleSheetParam } from './types';
declare class JSONToGoogleSheet {
    private _scopes;
    private _oAuth2Client?;
    private _isCachedTokenRequired;
    constructor(jsonToGoogleSheetParam?: JSONToGoogleSheetParam);
    get isCachedTokenRequired(): boolean;
    private _getAuthToken;
    private _genNewToken;
    authorize({ clientId, clientSecret, redirectUri }: CredentialProps): Promise<void>;
    invokeTask<T>(task: TaskFunction<T>, param?: any): Promise<T>;
}
export default JSONToGoogleSheet;
