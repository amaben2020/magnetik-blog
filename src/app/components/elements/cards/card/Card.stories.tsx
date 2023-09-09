import type { Meta, StoryObj } from "@storybook/react";

import Card from "./index";

const meta = {
  title: "Example/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "" },
    subtitle: { control: "" },
    author: {},
    image: { control: "" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Benosky",
    subtitle: "Algodev",
    author: {},
    image: "",
  },
};
export const Secondary: Story = {
  args: {
    title: "Benosky",
    subtitle: "Algodev",
    author: {},
    image: "",
  },
};
