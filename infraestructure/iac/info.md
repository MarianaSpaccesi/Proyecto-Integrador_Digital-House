# Infraestructura como código

Se utilizo terraform para crear una instancia de EC2 en AWS. Esta corre Ubuntu 22.04 LTS.  


# Paso a paso

Prerequisitos: Instalar terraform, AWS CLI y credenciales de acceso.

1. Setear las variables de entorno AWS\_REGION, AWS\_SECRET\_ACCESS\_KEY y AWS\_ACCESS\_KEY\_ID.  
2. Ejecutar terraform apply 

Para consultar el estado de la instancia:

`terraform show`

# Log

(4 horas) Busqueda de información: Indagar sobre terraform y sus casos de uso. 
(30m) Reunion con David (TL). Se habló de manera general el uso de terraform y pipelines de gitlab. Me oriento sobre como seguir, el rol que toma cada tecnologia y como integrarla con docker.
(~1h) Realizar diferentes deploys, a modo de prueba. Se crearon diversas instancias que luego fueron destruidas. El primer problema que surgio fue el de incorporar a terraform las keys ssh. 
(~1h) Buscar informacion sobre los servicios de AWS y como se interconectan. 
(+6h) Escribir la configuracion deseada y probarla. Surgio el problema de que no habia mas lugares disponibles para crear VPC. Lo solucione importando el estado de una VPC y su gateway.

# TODO
 
Investigar sobre las mejores practicas para realizar el deploy en el servidor tanto del backend como del frontend.
Delimitar las responsabilidades de terraform y de el pipeline en Gitlab.
