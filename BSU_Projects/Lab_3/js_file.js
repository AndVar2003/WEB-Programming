var serviceH = {};

function AddSeevice(service, info) {
  serviceH[service] = info;
}

function DeleteService(service) {
  if (!(service in serviceH)) {
    console.log("Ошибка! Нет такого издания");
    return false;
  }
  delete serviceH[service];
}

function GetServiceInfo(service) {
  if (!(service in serviceH)) {
    console.log("Ошибка! Нет такого издания");
  } else {
    console.log(
      "издание:" + service + ", тип издания:" + serviceH[service]
    );
  }
}
function ListService() {
  console.log("Перечень всех изданий:\n");
  for (service in serviceH) {
    console.log(
      "издание:" + service + ", тип издания:" + serviceH[service]
    );
  }
}
