import "@storybook/addon-actions/register";
import "@storybook/addon-links/register";

import { addDecorator } from "@storybook/react";
import { withConsole } from "@storybook/addon-console";

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

import "@dump247/storybook-state/register";
