<?

namespace Logic\ModelSerializers;
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Logic\ModelSerializers\ModelSerializer;

class GroupSerializer extends ModelSerializer{

    public $errors;
    
    function toApi($model){
        return array(
            'Id' => $model->id,
            'Name' => $model->Title,
            'Description' => $model->description,
            'Members' => UserSerializer.toApi($model->users())
        );
    }

    function toApiList($models){
        $serialized = Array();
        foreach($models as $model)
            array_push($serialized, $this.toApi($model));

        return json_encode($serialized);
    }

    function toServer($model){
        $out = new Group;
        $out->group_name = $model['Name'];
        $out->description = $model['Description'];
        return $out;
    }

    function toServerList($models){
        $out = Array();
        foreach($models as $model)
            array_push($out, $this.toServer($model));
        
        return json_encode($serialized);
    }

}