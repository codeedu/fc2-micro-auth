// @flow
import { Select, SelectProps } from "@material-ui/core";
import * as React from "react";
interface LocaleSelectProps extends SelectProps {
  locales: { url: string; label: string }[];
}

const LocaleSelect: React.FunctionComponent<LocaleSelectProps> = (props) => {
  const { locales, ...selectProps } = props;
  return (
    <Select
      native
      {...selectProps}
      onChange={(event) => {
        const locale = locales.find((l) => event.target.value === l.label);
        window.location.href = locale!.url;
      }}
    >
      {locales.map((locale, key) => (
        <option value={locale.label} key={key}>
          {locale.label}
        </option>
      ))}
    </Select>
  );
};

export default LocaleSelect;
