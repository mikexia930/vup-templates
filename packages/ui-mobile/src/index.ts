import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import type { App, Component } from 'vue';
import {
  IonicVue,
  IonApp,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
  alertController,
  loadingController,
  toastController,
} from '@ionic/vue';

type ToastCreateOptions = NonNullable<Parameters<typeof toastController.create>[0]>;
type AlertCreateOptions = NonNullable<Parameters<typeof alertController.create>[0]>;
type LoadingCreateOptions = NonNullable<Parameters<typeof loadingController.create>[0]>;

export {
  IonApp as VMApp,
  IonBadge as VMBadge,
  IonButton as VMButton,
  IonButtons as VMButtons,
  IonCard as VMCard,
  IonCardContent as VMCardContent,
  IonCardHeader as VMCardHeader,
  IonCardSubtitle as VMCardSubtitle,
  IonCardTitle as VMCardTitle,
  IonChip as VMChip,
  IonCol as VMCol,
  IonContent as VMContent,
  IonFooter as VMFooter,
  IonGrid as VMGrid,
  IonHeader as VMHeader,
  IonIcon as VMIcon,
  IonInput as VMInput,
  IonItem as VMItem,
  IonLabel as VMLabel,
  IonList as VMList,
  IonPage as VMPage,
  IonRouterOutlet as VMRouterOutlet,
  IonRow as VMRow,
  IonSearchbar as VMSearchbar,
  IonSegment as VMSegment,
  IonSegmentButton as VMSegmentButton,
  IonSpinner as VMSpinner,
  IonTextarea as VMTextarea,
  IonTitle as VMTitle,
  IonToolbar as VMToolbar,
};

export async function VMToast(options: ToastCreateOptions | string) {
  const toast = await toastController.create(
    typeof options === 'string' ? { message: options, duration: 1500, position: 'bottom' } : options
  );
  await toast.present();
  return toast;
}

export async function VMAlert(options: AlertCreateOptions) {
  const alert = await alertController.create(options);
  await alert.present();
  return alert;
}

export async function VMLoading(options: LoadingCreateOptions = {}) {
  const loading = await loadingController.create(options);
  await loading.present();
  return loading;
}

const components: Record<string, Component> = {
  VMApp: IonApp,
  VMBadge: IonBadge,
  VMButton: IonButton,
  VMButtons: IonButtons,
  VMCard: IonCard,
  VMCardContent: IonCardContent,
  VMCardHeader: IonCardHeader,
  VMCardSubtitle: IonCardSubtitle,
  VMCardTitle: IonCardTitle,
  VMChip: IonChip,
  VMCol: IonCol,
  VMContent: IonContent,
  VMFooter: IonFooter,
  VMGrid: IonGrid,
  VMHeader: IonHeader,
  VMIcon: IonIcon,
  VMInput: IonInput,
  VMItem: IonItem,
  VMLabel: IonLabel,
  VMList: IonList,
  VMPage: IonPage,
  VMRouterOutlet: IonRouterOutlet,
  VMRow: IonRow,
  VMSearchbar: IonSearchbar,
  VMSegment: IonSegment,
  VMSegmentButton: IonSegmentButton,
  VMSpinner: IonSpinner,
  VMTextarea: IonTextarea,
  VMTitle: IonTitle,
  VMToolbar: IonToolbar,
};

export default {
  install(app: App) {
    app.use(IonicVue);

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
