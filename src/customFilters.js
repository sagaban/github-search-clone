import Vue from "vue";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT_TEMPLATE } from "@/helpers/constants";

Vue.filter("formatDate", function(value) {
  if (!value) return value;
  return format(value, DEFAULT_DATE_FORMAT_TEMPLATE);
});

Vue.filter("formatBigAmount", function(value) {
  if (!value) return value;
  const abbrev = ["", "K", "M", "B"];
  let number = parseInt(value, 10);
  let abbrevIndex = 0;
  let floor;
  while ((floor = Math.floor(number / 1000)) > 0 && abbrevIndex < 3) {
    number = floor;
    abbrevIndex++;
  }
  return number + abbrev[abbrevIndex];
});
