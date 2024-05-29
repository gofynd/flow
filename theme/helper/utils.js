export const getGlobalConfigValue = (globalConfig, id) => {
  return globalConfig?.props?.[id] ?? "";
};

export const getSocialIcon = (title) =>
  title && typeof title === "string" ? `footer-${title.toLowerCase()}` : "";

export function replaceQueryPlaceholders(queryFormat, value1, value2) {
  return queryFormat.replace("{}", value1).replace("{}", value2);
}

export const singleValuesFilters = {
  sortOn: true,
};

export const numberWithCommas = (number) => {
  let num = number;
  if (number?.toString()[0] === "-") {
    num = number.toString().substring(1);
  }

  if (num) {
    let no =
      num.toString().split(".")[0].length > 3
        ? num
            .toString()
            .substring(0, num.toString().split(".")[0].length - 3)
            .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
          "," +
          num.toString().substring(num.toString().split(".")[0].length - 3)
        : num.toString();

    if (number.toString()[0] === "-") {
      no = "-" + no;
    }
    return no;
  } else {
    return 0;
  }
};
export function isRunningOnClient() {
  if (typeof window !== "undefined") {
    return globalThis === window;
  }

  return false;
}

export function convertDate(dateString) {
  const date = new Date(dateString);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);

  return formattedDate;
}

export function validateEmailField(value) {
  let emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(value);
}

export function validatePhone(phoneNo) {
  const re = /^[0-9]{10}$/;
  return phoneNo && phoneNo.length && re.test(phoneNo.trim());
}

export function validatePasswordField(value) {
  let passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\|;:\'",<.>\/\?€£¥₹§±])[A-Za-z\d`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\|;:\'",<.>\/\?€£¥₹§±]{8,}$/;
  return passwordPattern.test(value);
}

export function checkIfNumber(value) {
  let numberPattern = /^[0-9]+$/;
  return numberPattern.test(value);
}

export function getBindingFromPosition(fpi, position) {
  console.log("THEME EXTENSION", { fpi, position });
  const data = fpi.store.getState()?.theme?.theme?.config?.list || [];
  console.log("THEME EXTENSION", { data });

  // Iterate through the themes in the data
  for (const theme of data) {
    // Iterate through the pages in the theme
    if (theme?.page) {
      for (const page of theme.page) {
        // Check if 'settings', 'props', 'extension', and the specified 'position' exist
        if (
          page.settings &&
          page.settings.props &&
          page.settings.props.extension &&
          page.settings.props.extension[position]
        ) {
          // Get the first wrapper element (assuming there's only one)
          const wrapper = page.settings.props.extension[position][0];
          // Check if the wrapper has a 'wrapper' property
          if (wrapper && wrapper.template && wrapper.template.wrapper) {
            // Return the wrapper HTML
            return wrapper.template.wrapper;
          }
        }
      }
    }
  }
  // Return null if the 'position' is not found in the data
  return null;
}
