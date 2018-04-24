import { Injectable } from '@angular/core';
declare var gapi: any;

@Injectable()
export class GoogleEventsService {

    constructor() {
        // this.handleClientLoad();
    }
    // Client ID and API key from the Developer Console
    private CLIENT_ID = '1033528110418-529tesou14h192ie7p26c7e2u1ej89mb.apps.googleusercontent.com';
    private API_KEY = 'AIzaSyA5g0FbkgLm8SNwBSEm95Pyw_vOo7UcqDA';

    // Array of API discovery doc URLs for APIs used by the quickstart
    private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    private SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    public handleClientLoad(): void {
        gapi.load('client:auth2', this.initClient());
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    public initClient(): void {
        gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    public updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            this.listUpcomingEvents();
        }
    }

    /**
     *  Sign in the user upon button click.
     */
    public handleAuthClick(event): void {
        gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    public handleSignoutClick(event): void {
        gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    public listUpcomingEvents(): void {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(response => {
        let events = response.result.items;

        console.log(events);
    });
    }
}
