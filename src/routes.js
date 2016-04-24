import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Product from './react/product';
import Help from './react/static/help';

import App from './app';
import StreamHomePage from './containers/StreamHomePage';
import PostHomePage from './containers/PostHomePage';
import AccountHomePage from './components/AccountHomePage';
import ActivityHomePage from './containers/ActivityHomePage';
import AdminHomePage from './containers/AdminHomePage';
import AboutHomePage from './containers/AboutHomePage';
import PricingHomePage from './containers/PricingHomePage';
import DocsHomePage from './containers/DocsHomePage';
import ContactHomePage from './containers/ContactHomePage';
import TermsHomePage from './components/TermsHomePage';
import PrivacyHomePage from './components/PrivacyHomePage';
import IndividualsHomePage from './containers/IndividualsHomePage';
import OrganizationsHomePage from './react/organizations';

import AdminBillingHomePage from './components/AdminBillingHomePage';
import AdminDetailsHomePage from './containers/AdminDetailsHomePage';
import AdminMembersHomePage from './containers/AdminMembersHomePage';
import AdminTeamsHomePage from './components/AdminTeamsHomePage';

let Index = StreamHomePage;

if (typeof document !== 'undefined') {
    let subdomain = window.location.hostname;
    let parts = subdomain.split('.');
    if (['phourus', 'www', 'us-west-2'].indexOf(parts[0]) > -1) {
        Index = OrganizationsHomePage;
    }
}

module.exports = (
    <Route component={App} path="/">
        <IndexRoute component={Index}/>
        <Route path="stream" component={StreamHomePage} />
        <Route path="home" component={OrganizationsHomePage} />
        <Route path="product" component={Product} />
        <Route path="about" component={AboutHomePage} />
        <Route path="pricing" component={PricingHomePage} />
        <Route path="contact" component={ContactHomePage} />
        <Route path="terms" component={TermsHomePage} />
        <Route path="privacy" component={PrivacyHomePage} />
        <Route path="account" component={AccountHomePage} />
        <Route path="me" component={StreamHomePage} />
        <Route path="create" component={PostHomePage} />
        <Route path="activity" component={ActivityHomePage} />
        <Route path="notifications" component={ActivityHomePage} />
        <Route path="history" component={ActivityHomePage} />
        <Route path="help" component={Help}>
          <Route path=":id" component={Help} />
        </Route>
        <Route path="docs" component={DocsHomePage}>
            <Route path=":id" component={DocsHomePage} />
        </Route>
        <Route path="admin" component={AdminHomePage}>
            <Route path="details" component={AdminDetailsHomePage} />
            <Route path="members" component={AdminMembersHomePage} />
            <Route path="teams" component={AdminTeamsHomePage} />
            <Route path="billing" component={AdminBillingHomePage} />
        </Route>
        <Route path=":user/:post" component={PostHomePage}>
            <Route path="edit" component={PostHomePage} />
        </Route>
        <Route path=":user" component={StreamHomePage} />
    </Route>
);
