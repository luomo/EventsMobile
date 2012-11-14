package com.mobileApps.base.framework.genericFramework.hibernate;

import java.util.Iterator;

import org.hibernate.annotations.common.reflection.ReflectionManager;
import org.hibernate.cfg.Configuration;
import org.hibernate.ejb.event.EntityCallbackHandler;
import org.hibernate.mapping.PersistentClass;
import org.springframework.orm.hibernate3.annotation.AnnotationSessionFactoryBean;


public class EntityCallbackHandlerInitializer {

  private AnnotationSessionFactoryBean annotationSessionFactory;

  private EntityCallbackHandler entityCallbackHandler;

  public void init() throws ClassNotFoundException {
    final Configuration configuration = annotationSessionFactory.getConfiguration();
    final ReflectionManager reflectionManager = configuration.getReflectionManager();
    final Iterator<PersistentClass> classMappings = configuration.getClassMappings();
    while (classMappings.hasNext()) {
      entityCallbackHandler.add(
          reflectionManager.classForName(classMappings.next().getClassName(), this.getClass()),
          reflectionManager);
    }
  }
}
