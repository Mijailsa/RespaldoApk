import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
declare var google;
@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.page.html',
  styleUrls: ['./disponible.page.scss'],
})
export class DisponiblePage implements OnInit {

  constructor(private fireStore: FireService,private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService, private toastController: ToastController) { }
  //Variables disponible
  template = 1;
  pasajesSolicitados: any = [];
  idPasaje: any = [];
  solicitud: any;
  detalle: any = [];
  usuario: any = [];
  usuarios: any = [];
  viajes: any = [];
  total: any = [];
  rut: any
  KEY_VIAJE = "viajes";
  KEY_USUARIO = "usuarios";
  message: any = 0;
  titulo = "Viajes Disponibles";
  idViajes :any;
  //Variables detalle
  mapa: any;
  marker: any;
  search: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  inicio: any;
  final: any;
  datos: any;
  /* waypoints = WayPoint [] = */  /* DESCOMENTAR CUANDO SE CARGUEN EN LOS WAYPOINTS PARA TRAZAR LA RUTA DE LOS OTROS VIAJES INTEGRANDO EL LOCALSTORAGE SEGUN DONDE VAN LOS PASAJEROS */
  ubicacionDuoc = { lat: 0, lng: 0 };
  ubicacionDos = { lat: -33.600379048832046, lng: -70.57719180496413 };
  KEY: any = "viajes";

  /* métodos disponible */
  async ngOnInit() {
    /* console.log("Traigo al usuario en sesión:", this.usuario);
    this.viajes = await this.storage.getDatos(this.KEY_VIAJE);
    console.log("Traigo los viajes:", this.viajes); */
   /*  await this.viajes.forEach(async (value, index) => {
      console.log("Entro en el foreach");
      await this.fireStore.getDato(this.KEY_USUARIO, value.id).subscribe(
        (response: any) => {
          var interna = response.data();
          var arreglo = {
            precios: value,
            dato: interna
          };
          this.total.push(arreglo);
        }
      );
    }); */
    let rut = await this.route.snapshot.paramMap.get('rut');
    let id = await this.route.snapshot.paramMap.get('id');
    await this.fireStore.getDato(this.KEY_USUARIO, id).subscribe(
      (response: any) => {
        this.usuario = response.data();
      }
    );
    await this.fireStore.getDatos(this.KEY_USUARIO).subscribe(
      data=>{
        for(let usuario of data){
          let user = usuario.payload.doc.data();
          this.usuarios.push(user);
        }
      }
    )
    await this.fireStore.getDatos(this.KEY).subscribe(
      data => {
        for (let viaje of data) {
          let travel = viaje.payload.doc.data();
          this.viajes.push(travel);
        }
        this.viajes.forEach(async (value, index) => {
            console.log("Entro en el foreach: Total 1"+value.rut_conductor);
           let chofer = await this.usuarios.find(usu => usu.rut == value.rut_conductor);
           await this.fireStore.getDato(this.KEY_USUARIO, chofer.id).subscribe(
            (response: any) => {
              console.log("Ojalá me esperen: 2");
              var interna = response.data();
              console.log(interna.rut);
              var arreglo = {
                precios: value,
                dato: interna
              };
              console.log(arreglo);
              this.total.push(arreglo);
            }
          );
        });
      }
    );
  }

  /*async irDetalle(rut) {
    console.log("entro al método");
    await this.total.forEach(async (value, index) => {
      if (value.dato.rut == rut) {
        console.log("entro al detalle");
        this.template = 2;
        var detalleViaje = value;
        this.detalle = detalleViaje;
        var geo = await this.getUbicacionActual();
        this.ubicacionDuoc.lat = geo.coords.latitude;
        this.ubicacionDuoc.lng = geo.coords.longitude;
        await this.buscarViaje(value.precios.rut_conductor);
        await this.dibujarMapa();
        console.log("arreglo detalle: ", this.detalle);
      };
    });
  } */
  async irDetalle(rut) {
    console.log("entro al método");
    await this.total.forEach(async (value, index) => {
      if (value.dato.rut == rut) {
        console.log("entro al detalle");
        this.template = 2;
        var detalleViaje = value;
        this.detalle = detalleViaje;
        var nuevoOrigen = value.precios.origen;
        var nuevoDestino = value.precios.destino;
        await this.buscarViaje(value.precios.rut_conductor);
        var map: HTMLElement = document.getElementById('map');
        this.mapa = await new google.maps.Map(map, {
          center: this.ubicacionDuoc,
          zoom: 13
        });
        await this.directionsRenderer.setMap(this.mapa);
        this.marker = await new google.maps.Marker({
          position: this.ubicacionDuoc,
          map: this.mapa
        });
        var request = {
          origin: nuevoOrigen,
          destination: nuevoDestino,
          travelMode: google.maps.TravelMode.DRIVING
        };
        await this.directionsService.route(request, async (respuesta, status) => {
          await this.directionsRenderer.setDirections(respuesta);
        });
        this.marker.setPosition(null);
      };
    });
  }
  async irQr(){
    this.template = 3;
  }
  async leerQr(){
    var user = this.usuario.rut;
    await this.storage.guardarPasajeroQr(this.idViajes);
    this.idPasaje = await this.storage.getDatos(this.KEY_VIAJE);
    this.idPasaje.forEach(async (value, index) => {
      if (this.idViajes == value.id) {
        /*value.pasajeros = {...value.pasajeros, user };*/
        var nuevaCapacidad = value.capacidad-1;
        this.solicitud = [...value.pasajeros];
        this.solicitud.push(user);
        var creacion: any = {
          id: value.id,
          origen: value.origen,
          destino: value.destino,
          precio: value.precio,
          salida: value.salida,
          iniciado: value.iniciado,
          rut_conductor: value.rut_conductor,
          capacidad: nuevaCapacidad,
          pasajeros: this.solicitud,
        };
        console.log("creacion: ", creacion);
        await this.storage.actualizar(this.KEY_VIAJE, creacion);
        this.template = 1;
        this.titulo = "Viaje Solicitado";
        var alerta = "Viaje Solicitado";
        await this.toastError(alerta);
      }
    });
  }
  /* métodos detalle */
  async irViajes() {
    this.template = 1;
  }
  async irSolicitar(rut) {
    var user = this.usuario.rut;
    console.log("Soy rut solicitar: "+rut);
    await this.storage.guardarNuevoPasajero(rut, this.viajes);
    console.log("soy yo 1")
    this.idPasaje = this.viajes;
    console.log("Soy yo. 2")
    this.idPasaje.forEach(async (value, index) => {
      if (rut == value.rut_conductor) {
        /*value.pasajeros = {...value.pasajeros, user };*/
        var nuevaCapacidad = value.capacidad-1;
        this.solicitud = [...value.pasajeros];
        this.solicitud.push(user);
        var creacion: any = {
          id: value.id,
          origen: value.origen,
          destino: value.destino,
          precio: value.precio,
          salida: value.salida,
          iniciado: value.iniciado,
          rut_conductor: value.rut_conductor,
          capacidad: nuevaCapacidad,
          pasajeros: this.solicitud,
        };
        await this.storage.actualizar(this.KEY_VIAJE, creacion);
        this.template = 1;
        this.titulo = "Viaje Solicitado";
        var alerta = "Viaje Solicitado";
        await this.toastError(alerta);
      }
    });

  }
  async dibujarMapa() {
    var map: HTMLElement = document.getElementById('map');
    this.mapa = await new google.maps.Map(map, {
      center: this.ubicacionDuoc,
      zoom: 13
    });
    await this.directionsRenderer.setMap(this.mapa);
    var indicaciones: HTMLElement = await document.getElementById('indicaciones');
    await this.directionsRenderer.setPanel(indicaciones);
    this.marker = await new google.maps.Marker({
      position: this.ubicacionDuoc,
      map: this.mapa
    });
  }

  async agregarMarcador() {
    await this.marker.setPosition(this.ubicacionDos);
    await this.marker.setMap(this.mapa);
  }

  async calcularRuta() {
    var place = await this.search.getPlace().geometry.location;
    var request = {
      origin: this.ubicacionDuoc,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
      /* waypoints: this.wayPoints,
   optimizeWaypoints: true,  DESCOMENTAR  CUANDO SE OCUPE LOCAL STORAGE*/
    };

    await this.directionsService.route(request, async (respuesta, status) => {
      await this.directionsRenderer.setDirections(respuesta);
    });

    await this.marker.setPosition(null);
  }
  async getUbicacionActual(): Promise<any> {
    return new Promise(
      async (resolve, reject) => {
        await navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }
  async buscarViaje(identificador) {
    this.datos = await this.storage.getDatoViaje(this.KEY, identificador);
    console.log(this.datos)
    return this.datos;
  }
  async toastError(alerta) {
    const toast = await this.toastController.create({
      message: alerta,
      duration: 5000
    });
    toast.present();
  }

}
