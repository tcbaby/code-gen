#set ($name = $!name.substring(0,1).toLowerCase()+$!name.substring(1))
#set ($Name = $!name.substring(0,1).toUpperCase()+$!name.substring(1))
package $repositoryPackage;

import ${entityPackage}.${Name};
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tcbaby
 */
@Repository
public interface ${Name}Repository extends MongoRepository<$Name, String> {
#foreach( $field in $fields )##
#if($field.unique)##
    /** 根据${field.desc}获取实体 */
#set ($fieldName = $!field.name.substring(0,1).toUpperCase()+$!field.name.substring(1))##
    $Name findBy${fieldName}($field.type $field.name);
#end##
#end##
}