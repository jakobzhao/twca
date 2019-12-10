swtich(maintenanceType){
  case'Professional':
    return 1.0;
    break;
  case 'Premium':
    return 0.8;
    break;
  case 'Homeowner':
    return 0.6;
    break;
  case 'Adequate':
    return 0.5;
    break;
  case 'Survival':
    return 0.4;
    break;
}
