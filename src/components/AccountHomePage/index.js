import React from 'react';

import AccountInfo from '../../containers/AccountInfo';
import AccountOrgs from '../../containers/AccountOrgs';

const AccountHomePage = () => (
    <div className="account">
        <h2>My Account</h2>
        <AccountInfo />
        <AccountOrgs />
    </div>
);

export default AccountHomePage;
