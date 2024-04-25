import { Scheduler } from "@bryntum/scheduler";
import "./style.css";

const scheduler = new Scheduler({
  appendTo: "app",
  viewPreset: "dayAndMonth",

  // To center the view on a certain date
  visibleDate: new Date(2024, 1, 6),

  // Enables endless timeline scrolling
  infiniteScroll: true,
  // The infiniteScroll gets a better UX if a larger bufferCoef is used. When using lazyLoading, this only means that
  // the timeline "shifts" more seldom. Only events inside or close to the visible date range is requested from the
  // backend
  bufferCoef: 20,
  // Affects when the timespan shifts upon horizontal scroll
  bufferThreshold: 0.01,

  tickSize: 30,

  selectionMode: { rowNumber: true },

  features: {
    filter: false,
    resourceTimeRanges: true,
  },

  columns: [
    {
      text: "Name",
      field: "name",
      width: 200,
      sortable: false,
      editor: {
        type: "textfield",
        required: true,
      },
    },
  ],

  resourceStore: {
    readUrl: "http://localhost:3000/read-resources",
    autoLoad: true,
    sortParamName: "sort",
    filterParamName: "filter",
  },

  eventStore: {
    autoLoad: true,
    readUrl: "http://localhost:3000/read-events",
    fields: [{ name: "duration", persist: false }],
  },

  resourceTimeRangeStore: {
    autoLoad: true,
    readUrl: "http://localhost:3000/read-resourcetimeranges",
  },
  tbar: [
    {
      type: "container",
      style: "align-content:center",
      items: {
        label: "Network status:",
        networkValue: "Idle",
      },
    },
  ],
});

const updateNetworkValue = (text = "Idle", color = "green") => {
  const { networkValue } = scheduler.widgetMap;
  networkValue.html = text;
  networkValue.element.style.color = color;
};