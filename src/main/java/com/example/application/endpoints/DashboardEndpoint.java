package com.example.application.endpoints;

import java.util.List;
import com.example.application.data.service.dashboard.DashboardService;
import com.example.application.data.service.dashboard.Metric;
import com.example.application.data.service.dashboard.OrderInfo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import reactor.core.publisher.Flux;

@Endpoint
@AnonymousAllowed
class DashboardEndpoint {
  private DashboardService service;

  DashboardEndpoint(DashboardService service) {
    this.service = service;
  }

  public @Nonnull List<@Nonnull OrderInfo> getOrderInfo() {
    return service.getOrderInfo();
  }

  public @Nonnull Flux<@Nonnull List<@Nonnull Metric>> getMetrics() {
    return service.getMetrics();
  }
}
