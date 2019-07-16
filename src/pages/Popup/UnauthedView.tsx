import React from "react";

import tw from "tailwind.macro";

import { FittedButton } from "../../components/Button";
import P from "../../components/Text";
import Grid, { Column } from "../../components/Grid";
import Navbar from "../../components/Navbar";
import CenteredContent from "../../components/CenteredContent";

const Content = tw.div`p-4`;

interface UnauthedViewProps {
  onLogin: any;
}

const UnauthedView: React.FC<UnauthedViewProps> = ({ onLogin }) => (
  <>
    <Navbar />
    <Content>
      <Grid>
        <Column>
          <P>
            You need to login and authorize this extension with transientBug in
            order to continue.
          </P>
          <P>
            This button should open a new window to transientBug and start the
            authorization process. If you've previously authorized this
            extension with transientBug, this window may not appear; If this
            happens, simply reclick the bookmark icon to continue saving your
            bookmark.
          </P>
        </Column>
        <Column>
          <CenteredContent>
            <FittedButton onClick={onLogin}>Login</FittedButton>
          </CenteredContent>
        </Column>
      </Grid>
    </Content>
  </>
);

export default UnauthedView;
