package com.example.application.endpoints;

import java.util.List;
import com.example.application.data.entity.Person;
import com.example.application.data.service.dashboard.PersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
class CrudEndpoint {
  private PersonRepository repo;

  CrudEndpoint(PersonRepository repo) {
    this.repo = repo;
  }

  @Nonnull
  public List<@Nonnull Person> findAll() {
    return repo.findAll();
  }

  public Person save(Person person) {
    return repo.save(person);
  }
}
