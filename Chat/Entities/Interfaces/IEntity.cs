﻿using System;

namespace Chat.Entities.Interfaces
{
  public interface IEntity<TKey>
  {
    TKey Id { get; set; }
  }
  public interface IEntity : IEntity<string>
  {
  }
}
