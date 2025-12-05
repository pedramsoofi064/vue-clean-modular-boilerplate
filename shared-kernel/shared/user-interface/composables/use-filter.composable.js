import { dateTime as dateTimeMapper } from "@business-logic/shared/mappers";

const flatOptions = (options) => options.map((option) => option.value);

const capacityExtractor = ({ capacity, capacityOperation }, operationKey = "capacityOp") => ({
  capacity: capacity ? +capacity : undefined,
  [operationKey]: capacityOperation?.[0]?.value,
});
const dateExtractor = ([from, to]) => ({
  from: dateTimeMapper.toDatePayload(from) || undefined,
  to: dateTimeMapper.toDatePayload(to) || undefined,
});

export const useFilter = (type) => {
  const sharedStore = useSharedStore();

  const { filters } = storeToRefs(sharedStore);

  const employeeExtractor = ({ isBlocked, position, department }) => ({
    isBlocked: isBlocked?.[0]?.value,
    positionKey: flatOptions(position),
    departmentId: flatOptions(department),
  });
  const roomExtractor = ({ department, properties, capacity, capacityOperation }) => ({
    departments: flatOptions(department),
    properties,
    ...capacityExtractor({ capacity, capacityOperation }),
  });
  const clientExtractor = ({ gender, status }) => {
    const flattenStatus = flatOptions(status);
    const isBlocked = flattenStatus.length ? flattenStatus.includes("BLOCKED") : undefined;
    const isDebtor = flattenStatus.includes("DEBTOR");
    const isNormal = flattenStatus.includes("NORMAL");

    const balance = isDebtor ? -1 : isNormal ? 0 : undefined;

    return {
      gender: gender?.[0]?.value,
      isBlocked,
      balance,
    };
  };
  const paymentExtractor = ({ payType, service, date }) => ({
    payType: payType?.[0]?.value,
    serviceId: service?.[0]?.value,
    ...dateExtractor(date),
  });
  const documentExtractor = ({ service, provider, branch }) => ({
    serviceId: service?.[0]?.value,
    providers: flatOptions(provider),
    branchId: branch?.[0]?.value,
  });
  const sessionExtractor = ({
    service,
    provider,
    branch,
    date: [from, to],
    time,
    status,
    financialStatus,
  }) => {
    const flattenFinancialStatus = flatOptions(financialStatus);
    const isDebtor = flattenFinancialStatus.includes("DEBTOR");
    const isNormal = flattenFinancialStatus.includes("NORMAL");

    const isPayed = isDebtor ? false : isNormal ? true : undefined;

    return {
      serviceId: service?.[0]?.value,
      providerId: provider?.[0]?.value,
      branchId: branch?.[0]?.value,
      from: from || undefined,
      to: dateTimeMapper.toDatePayload(to) || undefined,
      status: status?.[0]?.value,
      isPayed,
      fromHour: time?.[0] || undefined,
      toHour: time?.[1] || undefined,
    };
  };
  const requestExtractor = ({ topic }) => ({
    type: flatOptions(topic),
  });
  const issueExtractor = ({ topic, author }) => ({
    ...requestExtractor({ topic }),
    authorId: flatOptions(author),
  });
  const courseExtractor = ({ comprehensive, date, provider, type, status, capacity, capacityOperation }) => ({
    comprehensive,
    providerId: flatOptions(provider),
    type: flatOptions(type),
    status: status?.[0]?.value,
    ...dateExtractor(date),
    ...capacityExtractor({ capacity, capacityOperation }, "capacityAction"),
  });

  const FILTER_EXTRACTOR = {
    staff: employeeExtractor,
    provider: employeeExtractor,
    room: roomExtractor,
    client: clientExtractor,
    payment: paymentExtractor,
    document: documentExtractor,
    session: sessionExtractor,
    issue: issueExtractor,
    request: requestExtractor,
    invoice: employeeExtractor,
    course: courseExtractor,
    financeSession: sessionExtractor,
    financePayment: paymentExtractor,
  };

  const search = useDebouncedComputed(() => filters.value?.[type]?.search ?? undefined);

  const filter = computed(() => {
    const filter = filters.value[type];

    if (!filter) return {};

    return { ...FILTER_EXTRACTOR[type]?.(filter), search: search.value };
  });

  return filter;
};
