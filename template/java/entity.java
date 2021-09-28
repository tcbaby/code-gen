#set ($name = $!name.substring(0,1).toLowerCase()+$!name.substring(1))
#set ($Name = $!name.substring(0,1).toUpperCase()+$!name.substring(1))
package $entityPackage;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author tcbaby
 */
@Data
@Accessors(chain = true)
@Document("$name")
public class $Name {
    private String id;
#foreach( $field in $fields )##
    /** $field.desc */
    private $field.type $field.name;
#end##
}